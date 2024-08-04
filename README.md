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
find duplicated files in "./demo"
Duplicate files found:

File no.1:
 - demo\info.txt
 - demo\sub\sub2-1\sub3\info.txt

File no.2:
 - demo\lovelive-1 copy.jpg
 - demo\lovelive-1.jpg
 - demo\sub\lovelive-1.jpg
 - demo\sub\sub2-1\lovelive-1.jpg
 - demo\sub\sub2-2\lovelive-1.jpg
```
