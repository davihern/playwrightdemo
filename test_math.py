import pytest
from math import add, subtract, divide


class TestAdd:
    """Test cases for the add function."""
    
    def test_add_positive_numbers(self):
        """Test adding two positive numbers."""
        assert add(5, 3) == 8
        assert add(10, 20) == 30
        assert add(1, 1) == 2
    
    def test_add_negative_numbers(self):
        """Test adding two negative numbers."""
        assert add(-5, -3) == -8
        assert add(-10, -20) == -30
        assert add(-1, -1) == -2
    
    def test_add_mixed_numbers(self):
        """Test adding positive and negative numbers."""
        assert add(5, -3) == 2
        assert add(-5, 3) == -2
        assert add(10, -10) == 0
    
    def test_add_with_zero(self):
        """Test adding with zero."""
        assert add(0, 0) == 0
        assert add(5, 0) == 5
        assert add(0, 5) == 5
        assert add(-5, 0) == -5
    
    def test_add_floats(self):
        """Test adding floating point numbers."""
        assert add(1.5, 2.5) == 4.0
        assert add(0.1, 0.2) == pytest.approx(0.3)
        assert add(-1.5, 2.5) == 1.0
    
    def test_add_large_numbers(self):
        """Test adding large numbers."""
        assert add(1000000, 2000000) == 3000000
        assert add(999999999, 1) == 1000000000


class TestSubtract:
    """Test cases for the subtract function."""
    
    def test_subtract_positive_numbers(self):
        """Test subtracting two positive numbers."""
        assert subtract(10, 5) == 5
        assert subtract(20, 10) == 10
        assert subtract(5, 3) == 2
    
    def test_subtract_negative_numbers(self):
        """Test subtracting two negative numbers."""
        assert subtract(-5, -3) == -2
        assert subtract(-10, -20) == 10
        assert subtract(-1, -1) == 0
    
    def test_subtract_mixed_numbers(self):
        """Test subtracting positive and negative numbers."""
        assert subtract(5, -3) == 8
        assert subtract(-5, 3) == -8
        assert subtract(10, -10) == 20
    
    def test_subtract_with_zero(self):
        """Test subtracting with zero."""
        assert subtract(0, 0) == 0
        assert subtract(5, 0) == 5
        assert subtract(0, 5) == -5
        assert subtract(-5, 0) == -5
    
    def test_subtract_floats(self):
        """Test subtracting floating point numbers."""
        assert subtract(5.5, 2.5) == 3.0
        assert subtract(0.3, 0.1) == pytest.approx(0.2)
        assert subtract(-1.5, 2.5) == -4.0
    
    def test_subtract_large_numbers(self):
        """Test subtracting large numbers."""
        assert subtract(3000000, 1000000) == 2000000
        assert subtract(1000000000, 999999999) == 1
    
    def test_subtract_same_numbers(self):
        """Test subtracting same numbers results in zero."""
        assert subtract(5, 5) == 0
        assert subtract(100, 100) == 0
        assert subtract(-5, -5) == 0


class TestDivide:
    """Test cases for the divide function."""
    
    def test_divide_positive_numbers(self):
        """Test dividing two positive numbers."""
        assert divide(10, 2) == 5.0
        assert divide(20, 4) == 5.0
        assert divide(9, 3) == 3.0
    
    def test_divide_negative_numbers(self):
        """Test dividing two negative numbers."""
        assert divide(-10, -2) == 5.0
        assert divide(-20, -4) == 5.0
        assert divide(-9, -3) == 3.0
    
    def test_divide_mixed_numbers(self):
        """Test dividing positive and negative numbers."""
        assert divide(10, -2) == -5.0
        assert divide(-10, 2) == -5.0
        assert divide(20, -4) == -5.0
    
    def test_divide_by_one(self):
        """Test dividing by one returns the same number."""
        assert divide(5, 1) == 5.0
        assert divide(-5, 1) == -5.0
        assert divide(0, 1) == 0.0
    
    def test_divide_zero_by_number(self):
        """Test dividing zero by a number returns zero."""
        assert divide(0, 5) == 0.0
        assert divide(0, -5) == 0.0
        assert divide(0, 100) == 0.0
    
    def test_divide_floats(self):
        """Test dividing floating point numbers."""
        assert divide(5.5, 2.5) == 2.2
        assert divide(7.5, 2.5) == 3.0
        assert divide(1.0, 4.0) == 0.25
    
    def test_divide_results_in_fraction(self):
        """Test division resulting in fractions."""
        assert divide(1, 3) == pytest.approx(0.333333, rel=1e-5)
        assert divide(2, 3) == pytest.approx(0.666667, rel=1e-5)
        assert divide(1, 7) == pytest.approx(0.142857, rel=1e-5)
    
    def test_divide_by_zero_raises_exception(self):
        """Test that dividing by zero raises ZeroDivisionError."""
        with pytest.raises(ZeroDivisionError, match="Cannot divide by zero"):
            divide(10, 0)
        
        with pytest.raises(ZeroDivisionError, match="Cannot divide by zero"):
            divide(-10, 0)
        
        with pytest.raises(ZeroDivisionError, match="Cannot divide by zero"):
            divide(0, 0)
