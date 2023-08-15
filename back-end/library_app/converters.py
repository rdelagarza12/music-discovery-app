class IntOrStringConverter:
    regex = '\w+'

    def to_python(self, value):
        if (value).isdigit():
            return int(value)
        else:
            return str(value)
        
    def to_url(self, value):
        return str(value)