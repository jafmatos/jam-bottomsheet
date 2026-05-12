#!/bin/bash

avdNames=("Pixel_5_Shard_1" "Pixel_5_Shard_2" "Pixel_5_Shard_3" "Pixel_5_Shard_4")

for avdName in ${avdNames[@]}; do
	konsole -e bash -c "emulator -avd ${avdName} -no-snapshot" &
done
