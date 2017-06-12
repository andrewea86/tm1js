# tm1js
First Release

==============

tm1flat(tm1o,attrs,bFilter).

--tm1o cell set response that is recived from TM1

--attrs (optional). Object. Specify which attributes to use instead of element principal names. 
Property name is the dimension name and value is the Attribute name. 
For example, {'Year':'Financial Year','Employee':'Full Name','Version':'Description'}

--bFilter (optional). Boolean. If it's true then each object will include dimensions from filters. By default, filters are not included.

==============

The final result will look as below.
[
{"Employee":"Pamela Ansman-Wolfe O",
"Period":"Year",
"Sales Quota Measure":"Amount",
"Scenario":"Actual",
"TM1CubeValue":1199000,
"Year":"2006"},
{"Employee":"Stephen Jiang Y",
"Period":"Year",
"Sales Quota Measure":"Amount",
"Scenario":"Actual",
"TM1CubeValue":389000,
"Year":"2007"},
....
]
