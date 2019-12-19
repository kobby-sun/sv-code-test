function Node(element) {
    this.element = element;   
    this.next = null;  
    this.getNext = function() {
        //skip the head to get next node
        return this.next.element == 'head' ? this.next.next : this.next;
    }       
}

function LList () {
    this.head = new Node( 'head' );     
    this.head.next = this.head;

    this.find = find;                   
    this.insert = insert;               
    this.remove = remove;               
    this.findPrev = findPrev;           
    this.display = display;   
    
    //this set the current pos of list 
    this.current = this.head;
    //total count indicator
    this.count = 0;
}

function display () {
    var current = this.head;
    while(!(current.next.element=='head')){
        console.log(current.next.element);
        current = current.next;
    }
}


function find ( item ) {
    var currNode = this.head;
    //make sure loop only once 
    while ( (currNode.element != item) && !(currNode.next.element=='head')){
        currNode = currNode.next;
    }
    return currNode;
}

function insert ( newElement , item ) {
    var newNode = new Node( newElement );
    var currNode = this.find( item );
    newNode.next = currNode.next;
    currNode.next = newNode;
    this.count ++;
}

function findPrev( item ) {
    var currNode = this.head;
    //make sure loop only once 
    while ( (currNode.next.element != item) && !(currNode.next.element=='head') ){
        currNode = currNode.next;
    }
    return currNode;
}

function remove ( item ) {
    var prevNode = this.findPrev( item );
    if( !( prevNode.next.element == 'head' ) ){
        prevNode.next = prevNode.next.next;
    }
    this.count --;
}


function buildLList(totalNum){
    var list = new LList();
    for (var i = 0; i < totalNum; i ++){
        list.insert('Child ' + (i + 1), i == totalNum - 1 ? null : 'Child ' + i)
    }
    list.current = list.current.getNext();
    return list;
}



 function playRound(circle, k){
    var loser = null;

    // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    // console.log('Play another round of game by starting with ' + circle.current.element)
    // console.log('Count ' + k)

    // console.log('---------All Children---------')
    // circle.display()

    // console.log('-------------------------------')

     while(k-- > 0){
        loser = circle.current;
        circle.current = loser.getNext();
     }

    //  console.log('loser', loser.element)

     circle.remove(loser.element)

     circle.current = loser.getNext();
    
 }

 function playGame(n, k){
    var circle = buildLList(n);

    while (circle.count > 1) {
        playRound(circle, k || (Math.floor(Math.random() * circle.count) + 1))
    }

    console.log();
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
    var winner = circle.current.element == 'head' ? 'Nobody' : circle.current.element
    console.log('Winner:', winner)
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')

    return winner
 }




 var circle = buildLList(5);
 console.log('@@ Build Children of 5 @@')
 console.log('total count should be 5:',  circle.count == 5)
 console.log('>> remove Child 5')
 circle.remove('Child 5')
 console.log('total count should be 4:',  circle.count == 4)
 console.log('>> insert Child 5 after Child 4')
 circle.insert('Child 5', 'Child 4')
 console.log('total count should be 5:',  circle.count == 5)
 console.log('Child 5 should be next to Child 4:',  circle.find('Child 4').next.element == 'Child 5' )
 console.log('>> insert Child 3.1 after Child 3')
 circle.insert('Child 3.1', 'Child 3')
 console.log('total count should be 6:',  circle.count == 6)
 console.log('Child 3.1 should be next to Child 3:',  circle.find('Child 3').next.element == 'Child 3.1' )
 console.log('Child 4 should be next to Child 3.1:',  circle.find('Child 3.1').next.element == 'Child 4' )
 console.log()



//  console.log('*******Play by 20 children and random count************')
//  playGame(20)
//  console.log('********************************************************')
//  console.log()


function testPlay(total, count, winner){
    console.log('*******Play by ' + total + ' children and ' + count + ' count************')
    result = playGame(total, count)
    console.log('*******Winner should be ' + winner + '************')
    console.log('Test passed:', result == winner)
    console.log()
}

testPlay(3, 2, 'Child 3')
testPlay(1, 2, 'Child 1')
testPlay(1, 100, 'Child 1')
testPlay(0, 2, 'Nobody')
testPlay(-1, 2, 'Nobody')
testPlay(5, 1, 'Child 5')
testPlay(100, 1, 'Child 100')
testPlay(5, 3, 'Child 4')
