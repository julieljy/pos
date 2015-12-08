var items_buy=[];
var items_buy_count=[];
var all_items=loadAllItems();
var promotions=loadPromotions();
var items_free=[];
var items_buy_count_total=[];
var all_total=[];
var result={};

function get_items_buy(inputs,all_items){
    var n=0;
    var check;
    for(var i=0;i<inputs.length;i++){
        check=0;
        for(var j=0;j<all_items.length;j++){
            if(inputs[i]==all_items[j].barcode){
                items_buy[n]=all_items[j];
                n++;
                check=1;
            }
        }
        if(check==0){
            var need_weight=[];
            need_weight=inputs[i].split('-');
            for(var k=0;k<all_items.length;k++){
                if(need_weight[0]==all_items[k].barcode){
                    for(var l=0;l<parseInt(need_weight[1]);l++){
                        items_buy[n]=all_items[k];
                        n++;
                    }
                }
            }
        }
    }
    return items_buy;
}

function get_items_buy_count(items_buy){
    //items_buy=get_items_buy();
    var check;
    var n=0;
    items_buy_count[0]={barcode:items_buy[0].barcode,
                        name:items_buy[0].name,
                        count:1,
                        unit:items_buy[0].unit,
                        price:items_buy[0].price};
    for(var i=1;i<items_buy.length;i++){
        check=0;
        for(var j=0;j<items_buy_count.length;j++){
            if(items_buy[i].barcode==items_buy_count[j].barcode){
                items_buy_count[j].count++;
                check=1;
            }
        }

        if(check==0){

            n++;
            items_buy_count[n]={barcode:items_buy[i].barcode,
                                name:items_buy[i].name,
                                count:1,
                                unit:items_buy[i].unit,
                                price:items_buy[i].price};
        }

    }
    return items_buy_count;
}

function get_items_free(items_buy_count,promotions){
    //items_buy_count=get_items_buy_count();
    var n=0;
    for(var i=0;i<items_buy_count.length;i++){
        for(var j=0;j<promotions[0].barcodes.length;j++){
            if(items_buy_count[i].barcode==promotions[0].barcodes[j]){
                if(items_buy_count[i].count>=3){
                    items_free[n]={name:items_buy_count[i].name,
                                   count:(items_buy_count[i].count-items_buy_count[i].count%3)/3,
                                   unit:items_buy_count[i].unit,
                                   price:items_buy_count[i].price};
                    n++;
                }
            }
        }
    }
    return items_free;
}

function get_items_buy_count_total(items_buy_count,items_free){
    //items_buy_count=get_items_buy_count();
    var check;
    for(var i=0;i<items_buy_count.length;i++){
        check=0;
        items_buy_count_total[i]=items_buy_count[i];
        for(var j=0;j<items_free.length;j++){
            if(items_buy_count[i].name==items_free[j].name){
                items_buy_count_total[i].total=(items_buy_count[i].count-items_free[j].count)*items_buy_count[i].price;
                check=1;
            }
        }
        if(check==0){
            items_buy_count_total[i].total=items_buy_count[i].count*items_buy_count[i].price;
        }
    }
    return items_buy_count_total;
}

function get_all_total(items_buy_count_total,items_free){
    all_total[0]={all:0,save:0};
    for(var i=0;i<items_buy_count_total.length;i++){
        all_total[0].all+=items_buy_count_total[i].total;
    }
    for(var j=0;j<items_free.length;j++){
        all_total[0].save+=items_free[j].count*items_free[j].price;
    }
    return all_total;
}

function get_result(items_buy_count_total,items_free,all_total){
    result={items_list:items_buy_count_total,
            gift:items_free,
            account:all_total}
    return result;
}

function print(result){
    var print_result='***<没钱赚商店>购物清单***\n';
    for(var i=0;i<result.items_list.length;i++){
        print_result+='名称：'+result.items_list[i].name+'，数量：'+result.items_list[i].count+
                      result.items_list[i].unit+'，单价：'+result.items_list[i].price.toFixed(2)+'(元)'+
                      '，小计：'+result.items_list[i].total.toFixed(2)+'(元)\n';
    }
    print_result+='----------------------\n'+'挥泪赠送商品：\n';
    for(var j=0;j<result.gift.length;j++){
        print_result+='名称：'+result.gift[j].name+'，数量：'+result.gift[j].count+result.gift[j].unit+'\n';
    }
    print_result+='----------------------\n'+'总计：'+result.account[0].all.toFixed(2)+'(元)\n' +
                  '节省：'+result.account[0].save.toFixed(2)+'(元)\n'+'**********************';
    return print_result;
}

function printInventory(inputs){
//console.log(JSON.stringify(inputs));
    items_buy=get_items_buy(inputs,all_items);
    items_buy_count=get_items_buy_count(items_buy);
    items_free=get_items_free(items_buy_count,promotions);
    items_buy_count_total=get_items_buy_count_total(items_buy_count,items_free);
    all_total=get_all_total(items_buy_count_total,items_free);
    result=get_result(items_buy_count_total,items_free,all_total);
    print_result=print(result);
    console.log(print_result);

}


//TODO: Please write code in this file.
