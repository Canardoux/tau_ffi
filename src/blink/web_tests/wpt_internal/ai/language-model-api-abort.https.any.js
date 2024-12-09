// META: script=resources/workaround-for-362676838.js
// META: script=resources/utils.js

promise_test(async (t) => {
  testAbort(t, (signal) => {
    return ai.languageModel.create({
      signal: signal
    });
  });
}, "Aborting AILanguageModelFactory.create().");

promise_test(async (t) => {
  const session = await ai.languageModel.create();
  testAbort(t, (signal) => {
    return session.clone({
      signal: signal
    });
  });
}, "Aborting AILanguageModel.clone().");

promise_test(async (t) => {
  const session = await ai.languageModel.create();
  testAbort(t, (signal) => {
    return session.prompt(
      "Write a poem", { signal: signal }
    );
  });
}, "Aborting AILanguageModel.prompt().");
