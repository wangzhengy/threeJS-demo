export class Stack {
    dataStore = [];    //初始化为空
    top = 0;           //记录栈顶位置
    pop = pop;         //出栈
    push = push;       //入栈
    peek = peek;       //查看栈顶元素
    length = length;   //查看栈内元素总数
    clear = clear;     //清空栈
}

//该方法将一个新元素入栈，放到数组中 top 所对应的位置上，并将 top 的值加 1，让其指向数组的下一个空位置

function push( element ){
    this.dataStore[this.top++] = element;
}

//该方法与入栈相反，返回栈顶元素，并将 top 的值减 1

function pop(){
    return this.dataStore[--this.top];
}

//该方法返回的是栈顶元素，即 top - 1 个位置元素

function peek(){
    if( this.top > 0 ) return this.dataStore[this.top-1];
    else return 'Empty';
}

//该方法通过返回 top 属性的值来返回栈内总的元素个数

function length(){
    return this.top;
}

//该方法实现很简单，我们将 top 值置为 0 ， dataStore 数值清空即可

function clear(){
    delete this.dataStore;
    this.dataStore = [];
    this.top = 0;
}


