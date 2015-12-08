describe('pos', function () {
    var allItems;
    var inputs;

    beforeEach(function () {
        all_items = loadAllItems();
        inputs = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
        ];
    });

    it('should print correct text', function () {

        spyOn(console, 'log');

        printInventory(inputs);

        var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
            '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
            '----------------------\n' +
            '挥泪赠送商品：\n' +
            '名称：雪碧，数量：1瓶\n' +
            '名称：方便面，数量：1袋\n' +
            '----------------------\n' +
            '总计：51.00(元)\n' +
            '节省：7.50(元)\n' +
            '**********************';

          expect(console.log).toHaveBeenCalledWith(expectText);
    });
    //function 1
    it('should get 2 object of items_buy', function(){
        var array=[];
        get_weight(5,array,inputs);
        var expect_array=[{barcode: 'ITEM000003',name: '荔枝',unit: '斤',price: 15.00},
                          {barcode: 'ITEM000003',name: '荔枝',unit: '斤',price: 15.00}];
        expect(array).toEqual(expect_array);
    })
    //function 2
    it('should get items_buy',function(){
        var array=get_items_buy(inputs,all_items);
        var expect_array=[{barcode: 'ITEM000001',name: '雪碧',unit: '瓶',price: 3.00},
                          {barcode: 'ITEM000001',name: '雪碧',unit: '瓶',price: 3.00},
                          {barcode: 'ITEM000001',name: '雪碧',unit: '瓶',price: 3.00},
                          {barcode: 'ITEM000001',name: '雪碧',unit: '瓶',price: 3.00},
                          {barcode: 'ITEM000001',name: '雪碧',unit: '瓶',price: 3.00},
                          {barcode: 'ITEM000003',name: '荔枝',unit: '斤',price: 15.00},
                          {barcode: 'ITEM000003',name: '荔枝',unit: '斤',price: 15.00},
                          {barcode: 'ITEM000005',name: '方便面',unit: '袋',price: 4.50},
                          {barcode: 'ITEM000005',name: '方便面',unit: '袋',price: 4.50},
                          {barcode: 'ITEM000005',name: '方便面',unit: '袋',price: 4.50}];
        expect(array).toEqual(expect_array);
    })
    //function 3
    it('should get items_count',function(){
        var items_buy=[{barcode: 'ITEM000001',name: '雪碧',unit: '瓶',price: 3.00},
                      {barcode: 'ITEM000001',name: '雪碧',unit: '瓶',price: 3.00},
                      {barcode: 'ITEM000001',name: '雪碧',unit: '瓶',price: 3.00},
                      {barcode: 'ITEM000001',name: '雪碧',unit: '瓶',price: 3.00},
                      {barcode: 'ITEM000001',name: '雪碧',unit: '瓶',price: 3.00},
                      {barcode: 'ITEM000003',name: '荔枝',unit: '斤',price: 15.00},
                      {barcode: 'ITEM000003',name: '荔枝',unit: '斤',price: 15.00},
                      {barcode: 'ITEM000005',name: '方便面',unit: '袋',price: 4.50},
                      {barcode: 'ITEM000005',name: '方便面',unit: '袋',price: 4.50},
                      {barcode: 'ITEM000005',name: '方便面',unit: '袋',price: 4.50}];
        var array=[{barcode: 'ITEM000001',name: '雪碧',count:1,unit: '瓶',price: 3.00}];
        items_count(1,array,items_buy);
        var expect_array=[{barcode:'ITEM000001',name:'雪碧',count:2,unit:'瓶',price:3.00}];
        expect(array).toEqual(expect_array);
    })
    //function 4
    it('should get items_buy_count',function(){
        var items_buy=[{barcode: 'ITEM000001',name: '雪碧',unit: '瓶',price: 3.00},
                      {barcode: 'ITEM000001',name: '雪碧',unit: '瓶',price: 3.00},
                      {barcode: 'ITEM000001',name: '雪碧',unit: '瓶',price: 3.00},
                      {barcode: 'ITEM000001',name: '雪碧',unit: '瓶',price: 3.00},
                      {barcode: 'ITEM000001',name: '雪碧',unit: '瓶',price: 3.00},
                      {barcode: 'ITEM000003',name: '荔枝',unit: '斤',price: 15.00},
                      {barcode: 'ITEM000003',name: '荔枝',unit: '斤',price: 15.00},
                      {barcode: 'ITEM000005',name: '方便面',unit: '袋',price: 4.50},
                      {barcode: 'ITEM000005',name: '方便面',unit: '袋',price: 4.50},
                      {barcode: 'ITEM000005',name: '方便面',unit: '袋',price: 4.50}];
        var array=get_items_buy_count(items_buy);
        var expect_array=[{barcode:'ITEM000001',name:'雪碧',count:5,unit:'瓶',price:3.00},
                          {barcode:'ITEM000003',name:'荔枝',count:2,unit:'斤',price:15.00},
                          {barcode:'ITEM000005',name:'方便面',count:3,unit:'袋',price:4.50}];
        expect(array).toEqual(expect_array);
    })
    //function 5
    it('should get items_free',function(){
        var items_buy_count=[{barcode:'ITEM000001',name:'雪碧',count:5,unit:'瓶',price:3.00},
                             {barcode:'ITEM000003',name:'荔枝',count:2,unit:'斤',price:15.00},
                             {barcode:'ITEM000005',name:'方便面',count:3,unit:'袋',price:4.50}];
        var array=get_items_free(items_buy_count,loadPromotions());
        var expect_array=[{name:'雪碧',count:1,unit:'瓶',price:3.00},
                          {name:'方便面',count:1,unit:'袋',price:4.50}];
        expect(array).toEqual(expect_array);
    })
    //function 6
    it('should get free_total',function(){
        var array=[];
        var items_buy_count=[{barcode:'ITEM000001',name:'雪碧',count:5,unit:'瓶',price:3.00},
                             {barcode:'ITEM000003',name:'荔枝',count:2,unit:'斤',price:15.00},
                             {barcode:'ITEM000005',name:'方便面',count:3,unit:'袋',price:4.50}];
        var items_free=[{name:'雪碧',count:1,unit:'瓶',price:3.00},
                        {name:'方便面',count:1,unit:'袋',price:4.50}];
        items_free_total(0,array,items_buy_count,items_free);
        var expect_array=[{barcode:'ITEM000001',name:'雪碧',count:5,unit:'瓶',price:3.00,total:12.00}];
        expect(array).toEqual(expect_array);
    })
    //function 7
    it('should get items_buy_count_total',function(){
        var items_buy_count=[{barcode:'ITEM000001',name:'雪碧',count:5,unit:'瓶',price:3.00},
                             {barcode:'ITEM000003',name:'荔枝',count:2,unit:'斤',price:15.00},
                             {barcode:'ITEM000005',name:'方便面',count:3,unit:'袋',price:4.50}];
        var items_free=[{name:'雪碧',count:1,unit:'瓶',price:3.00},
                        {name:'方便面',count:1,unit:'袋',price:4.50}];
        var array=get_items_buy_count_total(items_buy_count,items_free);
        var expect_array=[{barcode:'ITEM000001',name:'雪碧',count:5,unit:'瓶',price:3.00,total:12.00},
                          {barcode:'ITEM000003',name:'荔枝',count:2,unit:'斤',price:15.00,total:30.00},
                          {barcode:'ITEM000005',name:'方便面',count:3,unit:'袋',price:4.50,total:9.00}];
        expect(array).toEqual(expect_array);
    })
    //function 8
    it('should get all_total',function(){
        var items_buy_count_total=[{barcode:'ITEM000001',name:'雪碧',count:5,unit:'瓶',price:3.00,total:12.00},
                                   {barcode:'ITEM000003',name:'荔枝',count:2,unit:'斤',price:15.00,total:30.00},
                                   {barcode:'ITEM000005',name:'方便面',count:3,unit:'袋',price:4.50,total:9.00}];
        var items_free=[{name:'雪碧',count:1,unit:'瓶',price:3.00},
                        {name:'方便面',count:1,unit:'袋',price:4.50}];
        var array=get_all_total(items_buy_count_total,items_free);
        var expect_array=[{all:51.00,save:7.50}];
        expect(array).toEqual(expect_array);
    })
    //function 9
    it("should get result",function(){
         var items_buy_count_total=[{barcode:'ITEM000001',name:'雪碧',count:5,unit:'瓶',price:3.00,total:12.00},
                                    {barcode:'ITEM000003',name:'荔枝',count:2,unit:'斤',price:15.00,total:30.00},
                                    {barcode:'ITEM000005',name:'方便面',count:3,unit:'袋',price:4.50,total:9.00}];
         var items_free=[{name:'雪碧',count:1,unit:'瓶',price:3.00},
                         {name:'方便面',count:1,unit:'袋',price:4.50}];
         var object_result=get_result(items_buy_count_total,items_free,all_total);
         var expect_object_result={items_list:[{barcode:'ITEM000001',name:'雪碧',count:5,unit:'瓶',price:3.00,total:12.00},
                                        {barcode:'ITEM000003',name:'荔枝',count:2,unit:'斤',price:15.00,total:30.00},
                                        {barcode:'ITEM000005',name:'方便面',count:3,unit:'袋',price:4.50,total:9.00}],
                                   gift:[{name:'雪碧',count:1,unit:'瓶',price:3.00},
                                         {name:'方便面',count:1,unit:'袋',price:4.50}],
                                   account:[{all:51.00,save:7.50}]};
         expect(object_result).toEqual(expect_object_result);
    })
    //function 10
    it('should print result',function(){
        var result={items_list:[{barcode:'ITEM000001',name:'雪碧',count:5,unit:'瓶',price:3.00,total:12.00},
                                {barcode:'ITEM000003',name:'荔枝',count:2,unit:'斤',price:15.00,total:30.00},
                                {barcode:'ITEM000005',name:'方便面',count:3,unit:'袋',price:4.50,total:9.00}],
                    gift:[{name:'雪碧',count:1,unit:'瓶',price:3.00},
                          {name:'方便面',count:1,unit:'袋',price:4.50}],
                    account:[{all:51.00,save:7.50}]};
        var str=print(result);
        var expect_str='***<没钱赚商店>购物清单***\n' +
                       '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
                       '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
                       '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
                       '----------------------\n' +
                       '挥泪赠送商品：\n' +
                       '名称：雪碧，数量：1瓶\n' +
                       '名称：方便面，数量：1袋\n' +
                       '----------------------\n' +
                       '总计：51.00(元)\n' +
                       '节省：7.50(元)\n' +
                       '**********************';
        expect(str).toEqual(expect_str);
    })

});
