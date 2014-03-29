#hosted-kudos
This is a very simple backend for [https://github.com/masukomi/kudos](Kudos), a way of recommending posts. It requires Redis installed and running on your target system.  

##Usage  
To get the Kudos count for an item, make a request to http://serverurl/view/<item-id>. To increase the count for a Kudos item by one, make a request to http://serverurl/add/<item-id>.
