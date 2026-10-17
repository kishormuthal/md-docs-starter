# Code Blocks

Every block on this page has a copy button in the top right corner.

## Basic highlighting

```python
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))
```

## Title bar

```python title="hello.py"
print("Hello, World!")
```

## Line numbers

```python linenums="1"
def add(a, b):
    result = a + b
    return result
```

## Line numbers starting elsewhere

```python linenums="10"
x = 1
y = 2
print(x + y)
```

## Highlighted lines

```python hl_lines="2 4"
def total(items):
    subtotal = sum(items)
    tax = subtotal * 0.18
    return subtotal + tax
```

## Diff coloring

```diff
- old_function()
+ new_function()
  unchanged_line()
```

## Code annotations (click the + icons)

```python
def connect(host, port):
    print("Connecting...")  # (1)!
    return open_socket(host, port)  # (2)!
```

1. This message appears when the function is called.
2. `open_socket` is a placeholder for your real network code.

## Tabbed code (language switcher)

=== "Python"

    ```python
    print("Hello, World!")
    ```

=== "JavaScript"

    ```javascript
    console.log("Hello, World!");
    ```

=== "C"

    ```c
    #include <stdio.h>

    int main(void) {
        printf("Hello, World!\n");
        return 0;
    }
    ```

=== "Bash"

    ```bash
    echo "Hello, World!"
    ```

## Inline code with highlighting

Inline code can be highlighted too: `#!python print("hi")` and
`#!js console.log("hi")`.

## Shell sessions

```console
$ python --version
Python 3.12.0
$ pip list
```

## Other languages

```json
{ "name": "demo", "version": "1.0.0" }
```

```sql
SELECT name, score FROM students WHERE score > 80 ORDER BY score DESC;
```

```html
<button onclick="alert('Hi')">Click me</button>
```
