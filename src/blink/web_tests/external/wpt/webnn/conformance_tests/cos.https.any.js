// META: title=test WebNN API element-wise cos operation
// META: global=window,dedicatedworker
// META: variant=?cpu
// META: variant=?gpu
// META: variant=?npu
// META: script=../resources/utils.js
// META: timeout=long

'use strict';

// https://www.w3.org/TR/webnn/#api-mlgraphbuilder-unary
// Compute the cosine of the input tensor, element-wise.
//
// MLOperand cos(MLOperand input);


const getCosPrecisionTolerance = (graphResources) => {
  const toleranceValueDict = {float32: 1 / 1024, float16: 1 / 512};
  const expectedDataType =
      getExpectedDataTypeOfSingleOutput(graphResources.expectedOutputs);
  return {metricType: 'ATOL', value: toleranceValueDict[expectedDataType]};
};

const cosTests = [
  {
    'name': 'cos float32 0D scalar',
    'graph': {
      'inputs': {
        'cosInput': {
          'data': [85.56369018554688],
          'descriptor': {shape: [], dataType: 'float32'}
        }
      },
      'operators': [{
        'name': 'cos',
        'arguments': [{'input': 'cosInput'}],
        'outputs': 'cosOutput'
      }],
      'expectedOutputs': {
        'cosOutput': {
          'data': [-0.7380040884017944],
          'descriptor': {shape: [], dataType: 'float32'}
        }
      }
    }
  },
  {
    'name': 'cos float32 1D constant tensor',
    'graph': {
      'inputs': {
        'cosInput': {
          'data': [
            85.56369018554688,  -45.09983825683594,  -94.67750549316406,
            83.49029541015625,  -31.367904663085938, 70.18042755126953,
            -90.36229705810547, -83.00758361816406,  61.51649475097656,
            -32.51877975463867, -48.3765869140625,   -58.02735900878906,
            89.79197692871094,  -84.53326416015625,  -58.23252487182617,
            -76.14168548583984, -59.058876037597656, 77.38546752929688,
            -98.67289733886719, -63.6115608215332,   26.85724639892578,
            83.70417022705078,  76.56607055664062,   -47.83436584472656
          ],
          'descriptor': {shape: [24], dataType: 'float32'},
          'constant': true
        }
      },
      'operators': [{
        'name': 'cos',
        'arguments': [{'input': 'cosInput'}],
        'outputs': 'cosOutput'
      }],
      'expectedOutputs': {
        'cosOutput': {
          'data': [
            -0.7380040884017944,  0.43789437413215637,  0.9090799689292908,
            -0.23584702610969543, 0.9988471865653992,   0.48416373133659363,
            -0.7358400821685791,  0.24218930304050446,  0.25266921520233154,
            0.4510514736175537,   -0.31276169419288635, 0.09197491407394409,
            -0.2537800967693329,  -0.9583188891410828,  -0.11282006651163101,
            0.736129879951477,    -0.80721116065979,    -0.4045141637325287,
            -0.283336341381073,   0.7111190557479858,   -0.1531042903661728,
            -0.43673399090766907, 0.39213326573371887,  -0.7580515146255493
          ],
          'descriptor': {shape: [24], dataType: 'float32'}
        }
      }
    }
  },
  {
    'name': 'cos float32 1D tensor',
    'graph': {
      'inputs': {
        'cosInput': {
          'data': [
            85.56369018554688,  -45.09983825683594,  -94.67750549316406,
            83.49029541015625,  -31.367904663085938, 70.18042755126953,
            -90.36229705810547, -83.00758361816406,  61.51649475097656,
            -32.51877975463867, -48.3765869140625,   -58.02735900878906,
            89.79197692871094,  -84.53326416015625,  -58.23252487182617,
            -76.14168548583984, -59.058876037597656, 77.38546752929688,
            -98.67289733886719, -63.6115608215332,   26.85724639892578,
            83.70417022705078,  76.56607055664062,   -47.83436584472656
          ],
          'descriptor': {shape: [24], dataType: 'float32'}
        }
      },
      'operators': [{
        'name': 'cos',
        'arguments': [{'input': 'cosInput'}],
        'outputs': 'cosOutput'
      }],
      'expectedOutputs': {
        'cosOutput': {
          'data': [
            -0.7380040884017944,  0.43789437413215637,  0.9090799689292908,
            -0.23584702610969543, 0.9988471865653992,   0.48416373133659363,
            -0.7358400821685791,  0.24218930304050446,  0.25266921520233154,
            0.4510514736175537,   -0.31276169419288635, 0.09197491407394409,
            -0.2537800967693329,  -0.9583188891410828,  -0.11282006651163101,
            0.736129879951477,    -0.80721116065979,    -0.4045141637325287,
            -0.283336341381073,   0.7111190557479858,   -0.1531042903661728,
            -0.43673399090766907, 0.39213326573371887,  -0.7580515146255493
          ],
          'descriptor': {shape: [24], dataType: 'float32'}
        }
      }
    }
  },
  {
    'name': 'cos float32 2D tensor',
    'graph': {
      'inputs': {
        'cosInput': {
          'data': [
            85.56369018554688,  -45.09983825683594,  -94.67750549316406,
            83.49029541015625,  -31.367904663085938, 70.18042755126953,
            -90.36229705810547, -83.00758361816406,  61.51649475097656,
            -32.51877975463867, -48.3765869140625,   -58.02735900878906,
            89.79197692871094,  -84.53326416015625,  -58.23252487182617,
            -76.14168548583984, -59.058876037597656, 77.38546752929688,
            -98.67289733886719, -63.6115608215332,   26.85724639892578,
            83.70417022705078,  76.56607055664062,   -47.83436584472656
          ],
          'descriptor': {shape: [4, 6], dataType: 'float32'}
        }
      },
      'operators': [{
        'name': 'cos',
        'arguments': [{'input': 'cosInput'}],
        'outputs': 'cosOutput'
      }],
      'expectedOutputs': {
        'cosOutput': {
          'data': [
            -0.7380040884017944,  0.43789437413215637,  0.9090799689292908,
            -0.23584702610969543, 0.9988471865653992,   0.48416373133659363,
            -0.7358400821685791,  0.24218930304050446,  0.25266921520233154,
            0.4510514736175537,   -0.31276169419288635, 0.09197491407394409,
            -0.2537800967693329,  -0.9583188891410828,  -0.11282006651163101,
            0.736129879951477,    -0.80721116065979,    -0.4045141637325287,
            -0.283336341381073,   0.7111190557479858,   -0.1531042903661728,
            -0.43673399090766907, 0.39213326573371887,  -0.7580515146255493
          ],
          'descriptor': {shape: [4, 6], dataType: 'float32'}
        }
      }
    }
  },
  {
    'name': 'cos float32 3D tensor',
    'graph': {
      'inputs': {
        'cosInput': {
          'data': [
            85.56369018554688,  -45.09983825683594,  -94.67750549316406,
            83.49029541015625,  -31.367904663085938, 70.18042755126953,
            -90.36229705810547, -83.00758361816406,  61.51649475097656,
            -32.51877975463867, -48.3765869140625,   -58.02735900878906,
            89.79197692871094,  -84.53326416015625,  -58.23252487182617,
            -76.14168548583984, -59.058876037597656, 77.38546752929688,
            -98.67289733886719, -63.6115608215332,   26.85724639892578,
            83.70417022705078,  76.56607055664062,   -47.83436584472656
          ],
          'descriptor': {shape: [2, 3, 4], dataType: 'float32'}
        }
      },
      'operators': [{
        'name': 'cos',
        'arguments': [{'input': 'cosInput'}],
        'outputs': 'cosOutput'
      }],
      'expectedOutputs': {
        'cosOutput': {
          'data': [
            -0.7380040884017944,  0.43789437413215637,  0.9090799689292908,
            -0.23584702610969543, 0.9988471865653992,   0.48416373133659363,
            -0.7358400821685791,  0.24218930304050446,  0.25266921520233154,
            0.4510514736175537,   -0.31276169419288635, 0.09197491407394409,
            -0.2537800967693329,  -0.9583188891410828,  -0.11282006651163101,
            0.736129879951477,    -0.80721116065979,    -0.4045141637325287,
            -0.283336341381073,   0.7111190557479858,   -0.1531042903661728,
            -0.43673399090766907, 0.39213326573371887,  -0.7580515146255493
          ],
          'descriptor': {shape: [2, 3, 4], dataType: 'float32'}
        }
      }
    }
  },
  {
    'name': 'cos float32 4D tensor',
    'graph': {
      'inputs': {
        'cosInput': {
          'data': [
            85.56369018554688,  -45.09983825683594,  -94.67750549316406,
            83.49029541015625,  -31.367904663085938, 70.18042755126953,
            -90.36229705810547, -83.00758361816406,  61.51649475097656,
            -32.51877975463867, -48.3765869140625,   -58.02735900878906,
            89.79197692871094,  -84.53326416015625,  -58.23252487182617,
            -76.14168548583984, -59.058876037597656, 77.38546752929688,
            -98.67289733886719, -63.6115608215332,   26.85724639892578,
            83.70417022705078,  76.56607055664062,   -47.83436584472656
          ],
          'descriptor': {shape: [2, 2, 2, 3], dataType: 'float32'}
        }
      },
      'operators': [{
        'name': 'cos',
        'arguments': [{'input': 'cosInput'}],
        'outputs': 'cosOutput'
      }],
      'expectedOutputs': {
        'cosOutput': {
          'data': [
            -0.7380040884017944,  0.43789437413215637,  0.9090799689292908,
            -0.23584702610969543, 0.9988471865653992,   0.48416373133659363,
            -0.7358400821685791,  0.24218930304050446,  0.25266921520233154,
            0.4510514736175537,   -0.31276169419288635, 0.09197491407394409,
            -0.2537800967693329,  -0.9583188891410828,  -0.11282006651163101,
            0.736129879951477,    -0.80721116065979,    -0.4045141637325287,
            -0.283336341381073,   0.7111190557479858,   -0.1531042903661728,
            -0.43673399090766907, 0.39213326573371887,  -0.7580515146255493
          ],
          'descriptor': {shape: [2, 2, 2, 3], dataType: 'float32'}
        }
      }
    }
  },
  {
    'name': 'cos float32 5D tensor',
    'graph': {
      'inputs': {
        'cosInput': {
          'data': [
            85.56369018554688,  -45.09983825683594,  -94.67750549316406,
            83.49029541015625,  -31.367904663085938, 70.18042755126953,
            -90.36229705810547, -83.00758361816406,  61.51649475097656,
            -32.51877975463867, -48.3765869140625,   -58.02735900878906,
            89.79197692871094,  -84.53326416015625,  -58.23252487182617,
            -76.14168548583984, -59.058876037597656, 77.38546752929688,
            -98.67289733886719, -63.6115608215332,   26.85724639892578,
            83.70417022705078,  76.56607055664062,   -47.83436584472656
          ],
          'descriptor': {shape: [2, 1, 4, 1, 3], dataType: 'float32'}
        }
      },
      'operators': [{
        'name': 'cos',
        'arguments': [{'input': 'cosInput'}],
        'outputs': 'cosOutput'
      }],
      'expectedOutputs': {
        'cosOutput': {
          'data': [
            -0.7380040884017944,  0.43789437413215637,  0.9090799689292908,
            -0.23584702610969543, 0.9988471865653992,   0.48416373133659363,
            -0.7358400821685791,  0.24218930304050446,  0.25266921520233154,
            0.4510514736175537,   -0.31276169419288635, 0.09197491407394409,
            -0.2537800967693329,  -0.9583188891410828,  -0.11282006651163101,
            0.736129879951477,    -0.80721116065979,    -0.4045141637325287,
            -0.283336341381073,   0.7111190557479858,   -0.1531042903661728,
            -0.43673399090766907, 0.39213326573371887,  -0.7580515146255493
          ],
          'descriptor': {shape: [2, 1, 4, 1, 3], dataType: 'float32'}
        }
      }
    }
  }
];

if (navigator.ml) {
  cosTests.forEach((test) => {
    webnn_conformance_test(
        buildAndExecuteGraph, getCosPrecisionTolerance, test);
  });
} else {
  test(() => assert_implements(navigator.ml, 'missing navigator.ml'));
}