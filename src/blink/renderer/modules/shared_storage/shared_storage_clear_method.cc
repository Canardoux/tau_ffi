// Copyright 2024 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#include "third_party/blink/renderer/modules/shared_storage/shared_storage_clear_method.h"

#include "services/network/public/cpp/shared_storage_utils.h"
#include "third_party/blink/renderer/bindings/modules/v8/v8_shared_storage_modifier_method_options.h"
#include "third_party/blink/renderer/core/execution_context/execution_context.h"
#include "third_party/blink/renderer/modules/shared_storage/util.h"
#include "third_party/blink/renderer/platform/bindings/exception_state.h"
#include "third_party/blink/renderer/platform/weborigin/security_origin.h"

namespace blink {

// static
SharedStorageClearMethod* SharedStorageClearMethod::Create(
    ScriptState* script_state,
    ExceptionState& exception_state) {
  return MakeGarbageCollected<SharedStorageClearMethod>(
      script_state, SharedStorageModifierMethodOptions::Create(),
      exception_state);
}

// static
SharedStorageClearMethod* SharedStorageClearMethod::Create(
    ScriptState* script_state,
    const SharedStorageModifierMethodOptions* options,
    ExceptionState& exception_state) {
  return MakeGarbageCollected<SharedStorageClearMethod>(script_state, options,
                                                        exception_state);
}

SharedStorageClearMethod::SharedStorageClearMethod(
    ScriptState* script_state,
    const SharedStorageModifierMethodOptions* options,
    ExceptionState& exception_state) {
  ExecutionContext* execution_context = ExecutionContext::From(script_state);
  CHECK(execution_context->IsWindow() ||
        execution_context->IsSharedStorageWorkletGlobalScope());

  if (!CheckBrowsingContextIsValid(*script_state, exception_state)) {
    return;
  }

  if (execution_context->IsWindow() &&
      execution_context->GetSecurityOrigin()->IsOpaque()) {
    exception_state.ThrowDOMException(DOMExceptionCode::kInvalidAccessError,
                                      kOpaqueContextOriginCheckErrorMessage);
    return;
  }

  if (!CheckSharedStoragePermissionsPolicy(*execution_context,
                                           exception_state)) {
    return;
  }

  String with_lock = options->getWithLockOr(/*fallback_value=*/String());

  auto method =
      network::mojom::blink::SharedStorageModifierMethod::NewClearMethod(
          network::mojom::blink::SharedStorageClearMethod::New());

  method_with_options_ =
      network::mojom::blink::SharedStorageModifierMethodWithOptions::New(
          std::move(method), std::move(with_lock));
}

void SharedStorageClearMethod::Trace(Visitor* visitor) const {
  SharedStorageModifierMethod::Trace(visitor);
}

}  // namespace blink