# dup-detector

Node.js app to identify duplicate files within a specified directory

## Getting Started

To install dependencies:

```bash
pnpm install
```

To run:

```bash
pnpm exec nx run cli:dev -d "<path/to/directory>"
pnpm exec nx run cli:dev --dir "<path/to/directory>"

# Example
pnpm exec nx run cli:dev -d "./demo"
pnpm exec nx run cli:dev --dir "D:/dup-detector/demo"
pnpm exec nx run cli:dev --dir "D:\\dup-detector\\demo"
```

## Demo

```bash
$ bun prod --dir "./demo"

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
