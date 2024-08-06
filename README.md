# dup-detector

Node.js app to identify duplicate files within a specified directory

## Getting Started

To install dependencies:

```bash
bun install
```

To run:

```bash
bun dev -d "<path/to/directory>"
bun dev --dir "<path/to/directory>"

# Example
bun dev -d "./demo"
bun dev --dir "D:/dup-detector/demo"
bun dev --dir "D:\\dup-detector\\demo"
```

This project was created using `bun init` in bun v1.1.21. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Demo

```bash
$ bun dev --dir "./demo"

# Result
find duplicated files in "./demo"
Duplicate files found:

File no.1:
 - D:\dup-detector\demo\info.txt
 - D:\dup-detector\demo\sub\sub2-1\sub3\info.txt

File no.2:
 - D:\dup-detector\demo\lovelive-1 copy.jpg
 - D:\dup-detector\demo\lovelive-1.jpg
 - D:\dup-detector\demo\sub\lovelive-1.jpg
 - D:\dup-detector\demo\sub\sub2-1\lovelive-1.jpg
 - D:\dup-detector\demo\sub\sub2-2\lovelive-1.jpg

File no.3:
 - D:\dup-detector\demo\สวัสดี.txt
 - D:\dup-detector\demo\こんにちは.txt
```
