export interface DigitalGpioPinNativeWeb {
  initGpioPin: (pinNum: number) => boolean;

  releaseGpioPin: (pinNum: number) => boolean;

  setGpioPinValue: (pinNum: number) => boolean;
}
