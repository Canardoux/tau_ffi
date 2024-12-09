// META: title=test WebNN API element-wise neg operation
// META: global=window,dedicatedworker
// META: variant=?cpu
// META: variant=?gpu
// META: variant=?npu
// META: script=../resources/utils.js
// META: timeout=long

'use strict';

// https://www.w3.org/TR/webnn/#api-mlgraphbuilder-unary
// Compute the numerical negative value of the input tensor, element-wise.
//
// MLOperand neg(MLOperand input);


const getNegPrecisionTolerance = (graphResources) => {
  const toleranceValueDict = {float32: 0, float16: 0};
  const expectedDataType =
      getExpectedDataTypeOfSingleOutput(graphResources.expectedOutputs);
  return {metricType: 'ULP', value: toleranceValueDict[expectedDataType]};
};

const negTests = [
  {
    'name': 'neg float32 positive 0D scalar',
    'graph': {
      'inputs': {
        'negInput': {
          'data': [94.23045349121094],
          'descriptor': {shape: [], dataType: 'float32'}
        }
      },
      'operators': [{
        'name': 'neg',
        'arguments': [{'input': 'negInput'}],
        'outputs': 'negOutput'
      }],
      'expectedOutputs': {
        'negOutput': {
          'data': [-94.23045349121094],
          'descriptor': {shape: [], dataType: 'float32'}
        }
      }
    }
  },
  {
    'name': 'neg float32 negative 0D scalar',
    'graph': {
      'inputs': {
        'negInput': {
          'data': [-58.334503173828125],
          'descriptor': {shape: [], dataType: 'float32'}
        }
      },
      'operators': [{
        'name': 'neg',
        'arguments': [{'input': 'negInput'}],
        'outputs': 'negOutput'
      }],
      'expectedOutputs': {
        'negOutput': {
          'data': [58.334503173828125],
          'descriptor': {shape: [], dataType: 'float32'}
        }
      }
    }
  },
  {
    'name': 'neg float32 1D constant tensor',
    'graph': {
      'inputs': {
        'negInput': {
          'data': [
            -58.334503173828125, 94.23045349121094,   -67.69306945800781,
            -36.0666389465332,   17.115114212036133,  59.2606315612793,
            -43.77507781982422,  -14.875581741333008, 22.50856590270996,
            98.67680358886719,   2.315542221069336,   -89.86896514892578,
            -14.28854751586914,  16.22245216369629,   -4.688417911529541,
            -44.46965026855469,  -52.139259338378906, 24.165390014648438,
            -66.4577865600586,   -11.172324180603027, -25.024961471557617,
            22.26478385925293,   35.29130172729492,   -86.18817138671875
          ],
          'descriptor': {shape: [24], dataType: 'float32'},
          'constant': true
        }
      },
      'operators': [{
        'name': 'neg',
        'arguments': [{'input': 'negInput'}],
        'outputs': 'negOutput'
      }],
      'expectedOutputs': {
        'negOutput': {
          'data': [
            58.334503173828125, -94.23045349121094,  67.69306945800781,
            36.0666389465332,   -17.115114212036133, -59.2606315612793,
            43.77507781982422,  14.875581741333008,  -22.50856590270996,
            -98.67680358886719, -2.315542221069336,  89.86896514892578,
            14.28854751586914,  -16.22245216369629,  4.688417911529541,
            44.46965026855469,  52.139259338378906,  -24.165390014648438,
            66.4577865600586,   11.172324180603027,  25.024961471557617,
            -22.26478385925293, -35.29130172729492,  86.18817138671875
          ],
          'descriptor': {shape: [24], dataType: 'float32'}
        }
      }
    }
  },
  {
    'name': 'neg float32 1D tensor',
    'graph': {
      'inputs': {
        'negInput': {
          'data': [
            -58.334503173828125, 94.23045349121094,   -67.69306945800781,
            -36.0666389465332,   17.115114212036133,  59.2606315612793,
            -43.77507781982422,  -14.875581741333008, 22.50856590270996,
            98.67680358886719,   2.315542221069336,   -89.86896514892578,
            -14.28854751586914,  16.22245216369629,   -4.688417911529541,
            -44.46965026855469,  -52.139259338378906, 24.165390014648438,
            -66.4577865600586,   -11.172324180603027, -25.024961471557617,
            22.26478385925293,   35.29130172729492,   -86.18817138671875
          ],
          'descriptor': {shape: [24], dataType: 'float32'}
        }
      },
      'operators': [{
        'name': 'neg',
        'arguments': [{'input': 'negInput'}],
        'outputs': 'negOutput'
      }],
      'expectedOutputs': {
        'negOutput': {
          'data': [
            58.334503173828125, -94.23045349121094,  67.69306945800781,
            36.0666389465332,   -17.115114212036133, -59.2606315612793,
            43.77507781982422,  14.875581741333008,  -22.50856590270996,
            -98.67680358886719, -2.315542221069336,  89.86896514892578,
            14.28854751586914,  -16.22245216369629,  4.688417911529541,
            44.46965026855469,  52.139259338378906,  -24.165390014648438,
            66.4577865600586,   11.172324180603027,  25.024961471557617,
            -22.26478385925293, -35.29130172729492,  86.18817138671875
          ],
          'descriptor': {shape: [24], dataType: 'float32'}
        }
      }
    }
  },
  {
    'name': 'neg float32 2D tensor',
    'graph': {
      'inputs': {
        'negInput': {
          'data': [
            -58.334503173828125, 94.23045349121094,   -67.69306945800781,
            -36.0666389465332,   17.115114212036133,  59.2606315612793,
            -43.77507781982422,  -14.875581741333008, 22.50856590270996,
            98.67680358886719,   2.315542221069336,   -89.86896514892578,
            -14.28854751586914,  16.22245216369629,   -4.688417911529541,
            -44.46965026855469,  -52.139259338378906, 24.165390014648438,
            -66.4577865600586,   -11.172324180603027, -25.024961471557617,
            22.26478385925293,   35.29130172729492,   -86.18817138671875
          ],
          'descriptor': {shape: [4, 6], dataType: 'float32'}
        }
      },
      'operators': [{
        'name': 'neg',
        'arguments': [{'input': 'negInput'}],
        'outputs': 'negOutput'
      }],
      'expectedOutputs': {
        'negOutput': {
          'data': [
            58.334503173828125, -94.23045349121094,  67.69306945800781,
            36.0666389465332,   -17.115114212036133, -59.2606315612793,
            43.77507781982422,  14.875581741333008,  -22.50856590270996,
            -98.67680358886719, -2.315542221069336,  89.86896514892578,
            14.28854751586914,  -16.22245216369629,  4.688417911529541,
            44.46965026855469,  52.139259338378906,  -24.165390014648438,
            66.4577865600586,   11.172324180603027,  25.024961471557617,
            -22.26478385925293, -35.29130172729492,  86.18817138671875
          ],
          'descriptor': {shape: [4, 6], dataType: 'float32'}
        }
      }
    }
  },
  {
    'name': 'neg float32 3D tensor',
    'graph': {
      'inputs': {
        'negInput': {
          'data': [
            -58.334503173828125, 94.23045349121094,   -67.69306945800781,
            -36.0666389465332,   17.115114212036133,  59.2606315612793,
            -43.77507781982422,  -14.875581741333008, 22.50856590270996,
            98.67680358886719,   2.315542221069336,   -89.86896514892578,
            -14.28854751586914,  16.22245216369629,   -4.688417911529541,
            -44.46965026855469,  -52.139259338378906, 24.165390014648438,
            -66.4577865600586,   -11.172324180603027, -25.024961471557617,
            22.26478385925293,   35.29130172729492,   -86.18817138671875
          ],
          'descriptor': {shape: [2, 3, 4], dataType: 'float32'}
        }
      },
      'operators': [{
        'name': 'neg',
        'arguments': [{'input': 'negInput'}],
        'outputs': 'negOutput'
      }],
      'expectedOutputs': {
        'negOutput': {
          'data': [
            58.334503173828125, -94.23045349121094,  67.69306945800781,
            36.0666389465332,   -17.115114212036133, -59.2606315612793,
            43.77507781982422,  14.875581741333008,  -22.50856590270996,
            -98.67680358886719, -2.315542221069336,  89.86896514892578,
            14.28854751586914,  -16.22245216369629,  4.688417911529541,
            44.46965026855469,  52.139259338378906,  -24.165390014648438,
            66.4577865600586,   11.172324180603027,  25.024961471557617,
            -22.26478385925293, -35.29130172729492,  86.18817138671875
          ],
          'descriptor': {shape: [2, 3, 4], dataType: 'float32'}
        }
      }
    }
  },
  {
    'name': 'neg float32 4D tensor',
    'graph': {
      'inputs': {
        'negInput': {
          'data': [
            -58.334503173828125, 94.23045349121094,   -67.69306945800781,
            -36.0666389465332,   17.115114212036133,  59.2606315612793,
            -43.77507781982422,  -14.875581741333008, 22.50856590270996,
            98.67680358886719,   2.315542221069336,   -89.86896514892578,
            -14.28854751586914,  16.22245216369629,   -4.688417911529541,
            -44.46965026855469,  -52.139259338378906, 24.165390014648438,
            -66.4577865600586,   -11.172324180603027, -25.024961471557617,
            22.26478385925293,   35.29130172729492,   -86.18817138671875
          ],
          'descriptor': {shape: [2, 2, 2, 3], dataType: 'float32'}
        }
      },
      'operators': [{
        'name': 'neg',
        'arguments': [{'input': 'negInput'}],
        'outputs': 'negOutput'
      }],
      'expectedOutputs': {
        'negOutput': {
          'data': [
            58.334503173828125, -94.23045349121094,  67.69306945800781,
            36.0666389465332,   -17.115114212036133, -59.2606315612793,
            43.77507781982422,  14.875581741333008,  -22.50856590270996,
            -98.67680358886719, -2.315542221069336,  89.86896514892578,
            14.28854751586914,  -16.22245216369629,  4.688417911529541,
            44.46965026855469,  52.139259338378906,  -24.165390014648438,
            66.4577865600586,   11.172324180603027,  25.024961471557617,
            -22.26478385925293, -35.29130172729492,  86.18817138671875
          ],
          'descriptor': {shape: [2, 2, 2, 3], dataType: 'float32'}
        }
      }
    }
  },
  {
    'name': 'neg float32 5D tensor',
    'graph': {
      'inputs': {
        'negInput': {
          'data': [
            -58.334503173828125, 94.23045349121094,   -67.69306945800781,
            -36.0666389465332,   17.115114212036133,  59.2606315612793,
            -43.77507781982422,  -14.875581741333008, 22.50856590270996,
            98.67680358886719,   2.315542221069336,   -89.86896514892578,
            -14.28854751586914,  16.22245216369629,   -4.688417911529541,
            -44.46965026855469,  -52.139259338378906, 24.165390014648438,
            -66.4577865600586,   -11.172324180603027, -25.024961471557617,
            22.26478385925293,   35.29130172729492,   -86.18817138671875
          ],
          'descriptor': {shape: [2, 1, 4, 1, 3], dataType: 'float32'}
        }
      },
      'operators': [{
        'name': 'neg',
        'arguments': [{'input': 'negInput'}],
        'outputs': 'negOutput'
      }],
      'expectedOutputs': {
        'negOutput': {
          'data': [
            58.334503173828125, -94.23045349121094,  67.69306945800781,
            36.0666389465332,   -17.115114212036133, -59.2606315612793,
            43.77507781982422,  14.875581741333008,  -22.50856590270996,
            -98.67680358886719, -2.315542221069336,  89.86896514892578,
            14.28854751586914,  -16.22245216369629,  4.688417911529541,
            44.46965026855469,  52.139259338378906,  -24.165390014648438,
            66.4577865600586,   11.172324180603027,  25.024961471557617,
            -22.26478385925293, -35.29130172729492,  86.18817138671875
          ],
          'descriptor': {shape: [2, 1, 4, 1, 3], dataType: 'float32'}
        }
      }
    }
  }
];

if (navigator.ml) {
  negTests.forEach((test) => {
    webnn_conformance_test(
        buildAndExecuteGraph, getNegPrecisionTolerance, test);
  });
} else {
  test(() => assert_implements(navigator.ml, 'missing navigator.ml'));
}