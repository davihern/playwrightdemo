def add(a, b):
    """Add two numbers and return the result."""
    return a + b

def subtract(a, b):
    """Subtract b from a and return the result."""
    return a - b

def divide(a, b):
    """Divide a by b and return the result.
    
    Args:
        a: The dividend (numerator)
        b: The divisor (denominator)
    
    Returns:
        The result of a / b
    
    Raises:
        ZeroDivisionError: If b is zero
    """
    if b == 0:
        raise ZeroDivisionError("Cannot divide by zero")
    return a / b

def main():
    # Example usage
    num1 = 10
    num2 = 5
    
    # Perform addition
    sum_result = add(num1, num2)
    print(f"Addition: {num1} + {num2} = {sum_result}")
    
    # Perform subtraction
    subtract_result = subtract(num1, num2)
    print(f"Subtraction: {num1} - {num2} = {subtract_result}")
    
    # Interactive mode
    print("\n--- Interactive Calculator ---")
    try:
        a = float(input("Enter first number: "))
        b = float(input("Enter second number: "))
        
        print(f"\nResults:")
        print(f"{a} + {b} = {add(a, b)}")
        print(f"{a} - {b} = {subtract(a, b)}")
    except ValueError:
        print("Error: Please enter valid numbers")

if __name__ == "__main__":
    main()