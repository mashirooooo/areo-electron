const ffi = require('ffi-napi');
const ref = require('ref-napi');
const struct = require('ref-struct-napi');

const INT = ref.types.int;

const AccentPolicy = struct(
  {
    AccentState: INT,
    AccentFlags: INT,
    GradientColor: INT,
    AnimationId: INT
  }
);
const WindowCompositionAttributeData = struct({
  Attribute: INT,
  Data: ref.refType(AccentPolicy),
  SizeOfData: INT
});

const accent = new AccentPolicy();
accent.AccentState = 3;
accent.GradientColor = 0;

const windowcompositon = new WindowCompositionAttributeData();
windowcompositon.Attribute = 19;
windowcompositon.Data = accent.ref();
windowcompositon.SizeOfData = accent.ref().byteLength;

// console.log(WindowCompositionAttributeData.toString())

const user32 = new ffi.Library('user32', {
  SetWindowCompositionAttribute: [INT, [INT, ref.refType(WindowCompositionAttributeData)]]
});


module.exports.windowcompositon = windowcompositon;
module.exports.user32 = user32;