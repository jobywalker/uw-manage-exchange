UW Exchange Service, or Office 365
===================================

Testing
-------

For testing, the URL parameter is 

    index.html?test=true


Status and State 
----------------

Let's talk about "status" and "state." 

Your Exchange account has a status. It's either turned off or you're using UW Exchange Local, as two examples. 

Your account has has a state. It's either just become ready to use, it's in a problem state or it's in a "pending" state. Pending here meaning some action hasn't finished. But let's not get hung up on the term "pending." This verbiage isn't "finalized." In fact, the verbiage is "pending."


Testing Status and State
------------------------

You can set URL parameters to test status and state. 

For example you can try:

    index.html?test=true&status=default&state=pending

The `status` parameter can be: 

* default 
* exchange
* local 
* gal
* off

The `state` parameter can be: 

* pending
* ready 
* problem

Setting the `test` parameter to `true` let's you see hints for what you can test and how. 
