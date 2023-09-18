let someText = 
  `This is some text with
linebreaks and
# pseudocomments in it.
It needs a few more lines and ## comments
to be usefull for testing
stuff.`

let regex = /#.*\n/g;

console.log(someText.replaceAll(regex, "\n"));
