import { DigitalGpioPinNativeWeb } from "./native.web.declaration";
export default class DigitalGpioPinNativeWebImpl implements DigitalGpioPinNativeWeb {
  initGpioPin(pinNum: number): boolean {}
  releaseGpioPin(pinNum: number): boolean {}
  setGpioPinValue(pinNum: number): boolean {}
}
