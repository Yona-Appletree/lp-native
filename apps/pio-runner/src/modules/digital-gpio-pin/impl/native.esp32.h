#ifndef NATIVE_ESP32_H
#define NATIVE_ESP32_H

#import <stdint.h>

bool initGpioPin(
	int32_t pinNum
);

bool releaseGpioPin(
	int32_t pinNum
);

bool setGpioPinValue(
	int32_t pinNum
);

#endif