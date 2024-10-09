# Fair Billing

> Solution to the Fair Billing problem

## Setup

To run this, follow the steps below:

1. Clone the repository by running `git clone https://github.com/jayolin/fair-billing`

2. Follow up with the commands below:

```sh
cd fair-billing
yarn
```

This should install dependencies in your cloned project

3. Run the program with the following command:

```sh
yarn compute ./logs/containsInvalidIndicator.txt
```

Alternatively, you could run:

```sh
node index.js ./logs/containsInvalidIndicator.txt
```

## Project Structure

The project is  structured thus:

- `logs`: Folder containing the log files that can be passed in as arguments to the program.

- `FairBilling.js`: File containing logic for computing billing given a log file

- `fairBilling.test.js`: File containing tests for evaluating logic contained in `FairBilling.js`

- `index.js`: This is the entry file to the application. Accepts argument as log file path and logs result from computing billing.

- `utils.js`: Contains utility functions used across the project.

## Logs

The following logs present in the `./logs` folder can be used for running the program:

- `originalData.txt`: Contains the original data as seen in the specification document.

- `containsInvalidIndicator.txt`: Contains the original data embellished with sessions containing invalid indicators.

- `containsInvalidTimestamp.txt`: Contains the original data embellished with sessions containing invalid timestamps.

- `containsInvalidUsername.txt`: Contains the original data embellished with sessions containing invalid or no usernames.

## Scripts

Here are the scripts available for this project:

- `yarn test`: Runs the tests contained in the project to evaluate the billing functionality

- `yarn compute`: Runs the billing functionality and logs the output. Accepts a single argument corresponding to the path of a log file.

## Discussions

The following considerations were made during the course of the task:

1. Line Breaks: Since line breaks differ from platform to platform, they were handled appropriately to yield uniform results across platforms. Firstly, a `normalizeLineEndings` function was used to replace all possible line breaks with a specific one, when splitting the log data. A `getLineBreak` function was then used when logging the output to the console, so as for logs to contain the line breaks specific to the platform in use.

2. Test Cases: Test cases covered in this project were:

- `correctly computes original data`: Test ensures that app computes billing details correctly when the original data listed in the specification document is passed in.

- `correctly computes when data contains invalid timestamp`: Test ensures that app computes billing details correctly when the original data is modified with records containing invalid timestamps. The expectation is for the invalid records to be ignored.

- `correctly computes when data contains invalid username`: Test ensures that app computes billing details correctly when the original data is modified with records containing invalid/no usernames. The expectation is for the invalid records to be ignored.

- `correctly computes when data contains invalid start/stop indicator`: Test ensures that app computes billing details correctly when the original data is modified with records containing indicators that are not "Start" or "Stop". The expectation is for the invalid records to be ignored.

3. Assumptions: Some assumptions were made for this project:

- First entry always valid: Since it was specified that `End` records without a matching `Start` record could default to the first record of the log file, it was assumed that the first record in question was valid.

- Last entry always valid: Since it was specified that `Start` records without a matching `End` record could default to the last record of the log file, it was assumed that the last record in question was valid.

## Algorithm

Below is a brief description of the algorithm used in the project. The Big O notation for this is O(n), where n is the number of lines contained in the log file.

- Contents of the log file are fetched and each line is represented as an item in an array of strings.

- Each item in the array of strings is validated to ensure they follow the suggested pattern. Items which deviate from the pattern are ignored.

- Unique records are created for each user using a `Map`, which contains the `duration`, `session` and a `queue` to track sessions without corresponding `End` values. Queue was used due to its First In First Out approach.

- If indicator for session is `Start`, the timestamp is added to the user's queue and the user's number of session is incremented. The start session is also assumed to be non-terminating at first, hence the user's duration gets incremented by the difference between the last recorded timestamp of the log file and the current session's timestamp of the user.

- If indicator for session is `End`, and there are no `Start` sessions in the user's queue, the session is assumed to contain no matching `Start` session and the user's duration gets incremented by the difference between the current session's timestamp and the first recorderd timestamp of the log file.

- If however there is a `Start` session in the user's queue, the first item of the queue is selected (FIFO, yeilds the minimum possible total duration), and the user's duration is incremented by the difference between the current session's timestamp and the selected `Start` session's timestamp. Now, since this `Start` session was initially assumed to be non-terminating, which led to adding a specific value to the user's duration, that specifc value is then subtracted from the user's duration.