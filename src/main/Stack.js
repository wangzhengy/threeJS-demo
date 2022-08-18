export class Stack {
    dataStore = [];    //��ʼ��Ϊ��
    top = 0;           //��¼ջ��λ��
    pop = pop;         //��ջ
    push = push;       //��ջ
    peek = peek;       //�鿴ջ��Ԫ��
    length = length;   //�鿴ջ��Ԫ������
    clear = clear;     //���ջ
}

//�÷�����һ����Ԫ����ջ���ŵ������� top ����Ӧ��λ���ϣ����� top ��ֵ�� 1������ָ���������һ����λ��

function push( element ){
    this.dataStore[this.top++] = element;
}

//�÷�������ջ�෴������ջ��Ԫ�أ����� top ��ֵ�� 1

function pop(){
    return this.dataStore[--this.top];
}

//�÷������ص���ջ��Ԫ�أ��� top - 1 ��λ��Ԫ��

function peek(){
    if( this.top > 0 ) return this.dataStore[this.top-1];
    else return 'Empty';
}

//�÷���ͨ������ top ���Ե�ֵ������ջ���ܵ�Ԫ�ظ���

function length(){
    return this.top;
}

//�÷���ʵ�ֺܼ򵥣����ǽ� top ֵ��Ϊ 0 �� dataStore ��ֵ��ռ���

function clear(){
    delete this.dataStore;
    this.dataStore = [];
    this.top = 0;
}


