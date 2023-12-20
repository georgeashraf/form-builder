## A parser is a function that takes a string as input and returns a parse result

## A parse result is either a SUCCESS or a FAILURE

## A parser combinator is a function that takes parsers as input and returns a new parser (Higher order functions)

## terminal parsers:  parsers that match against a terminal expression in the grammar

## alternatives combinator: which chooses between alternative parsers. It returns a combined parser that tries each alternative in turn until one of them matches

## sequence combinator: which chains parsers together. The output of one parser is taken as the input to another