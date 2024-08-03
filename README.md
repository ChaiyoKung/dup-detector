# dup-detector

Node.js app to identify duplicate files within a specified directory

## Getting Started

To install dependencies:

```bash
bun install
```

To run:

```bash
bun dev "<path/to/directory>"

# Example
bun dev "./demo"
bun dev "D:/dup-detector/demo"
bun dev "D:\\dup-detector\\demo"
```

This project was created using `bun init` in bun v1.1.21. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Demo

```bash
$ bun dev "./demo"

# Result
a69f07d64295ce85b4fe7607a0931539864b4abfe8b0a6110e85d3f32bf34ec5
 - demo/info.txt
 - demo/sub/sub2-1/sub3/info.txt
c300a04ac8b64d960fce870cebaf60c77e5db28362bf225894db7f583e971956
 - demo/lovelive-1 copy.jpg
 - demo/lovelive-1.jpg
 - demo/sub/lovelive-1.jpg
 - demo/sub/sub2-1/lovelive-1.jpg
 - demo/sub/sub2-2/lovelive-1.jpg
1e11070fca334b61126bad2557ef415735d811370dcaa41558cdeffe4d05952b
 - demo/lovelive-2.jpg
```
