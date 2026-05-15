#!/bin/bash

total_passed=0
total_tests=0
command_to_run="npm run test -- --shard-split=4"
output_file="run-repeatedly-output.ignore.txt"

eval "rm -f $output_file"

while getopts "t:" opt; do
    case $opt in
        t)
            times_value="$OPTARG"
            ;;
        *)
            echo "Usage: $0 -t value"
            exit 1
            ;;
    esac
done

case $times_value in
    ''|*[!0-9]*)
        echo "Error: -times requires a positive integer. Got: '$times_value'"
        exit 1
        ;;
esac

for i in $(seq 1 $times_value); do
    echo "--- Running iteration $i of $times_value ---" >> "$output_file"
    output=$(eval "$command_to_run" 2>&1)
		echo "$output" >> "$output_file"
    echo "--- Iteration $i completed ---" >> "$output_file"
		last_match=$(echo "$output" | grep -oE 'Passed: [0-9]+/[0-9]+' | tail -n1 | grep -oE '[0-9]+/[0-9]+')
		passed=$(echo "$last_match" | cut -d'/' -f1)
		total=$(echo "$last_match" | cut -d'/' -f2)

		total_passed=$((total_passed + passed))
		total_tests=$((total_tests + total))
done

echo "Passed: $total_passed"
echo "Total: $total_tests"