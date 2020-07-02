const global_symbolfile ="https://weifix.github.io/asx/csv/symbols.csv";

const ASX_OUCH_MSG_MAP = {

    UO  : ["PacketLength","PacketType","MessageType","OrderToken","OrderBookID","Side","Quantity","Price","TimeInForce","OpenClose","ClientAccount","CustomerInfo","ExchangeInfo","ClearingParticipant","CrossingKey","CapacityOfParticipant","DirectedWholesale","ExecutionVenue","IntermediaryID","OrderOrigin","Filler","OUCHOrderType","ShortSellQuantity","MinimumAcceptableQuantity"],
    UU  : ["PacketLength","PacketType","MessageType","ExistingOrderToken","ReplacementOrderToken","Quantity","Price","OpenClose","ClientAccount","CustomerInfo","ExchangeInfo","CapacityOfParticipant","DirectedWholesale","ExecutionVenue","IntermediaryID","OrderOrigin","Filler","ShortSellQuantity","MinimumAcceptableQuantity"],
    UX  : ["PacketLength","PacketType","MessageType","OrderToken"],
    SA  : ["PacketLength","PacketType","MessageType","Timestamp","OrderToken","OrderBookID","Side","OrderID","Quantity","Price","TimeInForce","OpenClose","ClientAccount","OrderState","CustomerInfo","ExchangeInfo","ClearingParticipant","CrossingKey","CapacityOfParticipant","DirectedWholesale","ExecutionVenue","IntermediaryID","OrderOrigin","Filler","OUCHOrderType","ShortSellQuantity","MinimumAcceptableQuantity"],
    SC  : ["PacketLength","PacketType","MessageType","Timestamp","OrderToken","OrderBookID","Side","OrderID","Reason"],
    SU  : ["PacketLength","PacketType","MessageType","Timestamp","ReplacementOrderToken","PreviousOrderToken","OrderBookID","Side","OrderID","Quantity","Price","TimeInForce","OpenClose","ClientAccount","OrderState","CustomerInfo","ExchangeInfo","ClearingParticipant","CrossingKey","CapacityOfParticipant","DirectedWholesale","ExecutionVenue","IntermediaryID","OrderOrigin","Filler","OUCHOrderType","ShortSellQuantity","MinimumAcceptableQuantity"],
    SE  : ["PacketLength","PacketType","MessageType","Timestamp","OrderToken","OrderBookID","TradedQuantity","TradePrice","MatchID","DealSource","MatchAttributes"],
    SJ  : ["PacketLength","PacketType","MessageType","Timestamp","OrderToken","RejectCode"]

}

var PacketType_options = [
  	 {id:   	"U", value:"U-UnSequenced"},
	 {id:   	"S", value: "S-Sequenced"},
  	 {id:   "L", value: "L- LoginRequest"},
	 {id:   	"A", value: "A-LoginAccepted"},
	 {id:   	"J", value:"J-LoginReject"},
	 {id:   	"O", value: "O-LogoutRequest"},
	 {id:   	"R", value: "R-ClientHeartbeat"},
	 {id:   	"H", value: "H-ServerHeartbeat"},
	 {id:   	"Z", value: "Z-EndofSession"},
	 {id:   	"+", value: "+-DebugPacket"}
];




var participant_capacity_options =[
  {   id:  "A", value : "A(Agency)"},
  {   id: "P" ,value : "P(Principal)"},
  {   id: "M" ,value:"M(Mixed Agency and Principal)"}
  ]

var side_options = [
         {id: "B", value:  "B-Buy order"},
         {id: "S", value:  "S-Sell order"},
         {id: "T", value:  "T-Short sell order"},
         {id: "C", value:  "C-Buy order in a Combination where the sell legs are short sells."}
];

var MessageType_options = [
     {id:   "O", value: "O-EnterOrder"},
     {id:   "U", value: "U-ReplaceOrder"},
     {id:   "X", value: "X-CancelOrder"},
     {id:   "-", value: "---"},
     {id:   "Y", value: "Y-CancelbyOrderID"},
     {id:   "A", value: "A-OrderAccepted"},
     {id:   "J", value: "J-OrderRejected"},
     {id:   "C", value: "C-OrderCanceled"},
     {id:   "E", value: "E-OrderExecuted"},
     {id:   "U", value: "U-OrderReplaced"}
];

var tif_options = [
         {id: "0", value: "0(Day)"},
         {id:"3", value:"3(Immediate or Cancel (FaK))"},
        {id: "4", value:"4(Fill or Kill)"},
        {id: "100", value: "100(Fill-and-kill immediately)"}
 
];

var directwholesale_options =[
   {id:   "Y", value: "Y-True"},
      {id:   "N", value:"N-False (default)"}
  
  ]

var openclose_options = [
     {id:  "0", value:"0(Not used by ASX)"}
];

var OUCHOrderType_options= [
       {id:  "Y", value: "Y-Limit order." },
       {id:   "N", value: "N-Centre Point Order (mid-point only). o Price > 0 defines a Centre Point Limit order. Price = 0 defines a Centre Point Market order."},
        {id:  "D", value: "D-Centre Point Order (‘dark limit’ order with mid-tick flag enabled)."},
       {id:   "S", value: "S-Sweep order. Price > 0 defines a Limit Sweep order. Price = 0 defines a Market-to- Limit Sweep order."},
       {id:   "P", value: "P-Sweep order (dual posted, i.e. midtick flag is enabled)."},
       {id:   "B", value: "B-Mid-point Centre Point Block Order with single fill MAQ"},
      {id:    "F", value: "F-Dark limit Centre Point Block Order with single fill MAQ"},
       {id:   "T", value: "T-Centre Point Sweep Order with single fill MAQ"},
   {id:   "C", value: "C-Any Price Block order"},
   {id:   "E", value: "E-Any Price Block order with single fill MAQ"}

];


  webix.ui({
  id:"symbolList",
  view:"suggest",
  data:['avc','ddd']
});

var propertysheet_ord = {
  view:"property",  id:"sets_ord",   width:450, nameWidth:200,
  
  on: {
 
    onAfterEditStop : handlerListEdit,
     onLiveEdit: handlerListEdit,
     onBeforeEditStop : handlerListEdit,
    onItemClick:handlerListEdit
  },
  elements:[
   
    { label:"ASX NEW ORD", type:"label" },
    { label:"PacketLength", type:"text", id:"PacketLength", value: 158},
    { label:"PacketType", type:"combo", id:"PacketType", value: 'U' , options: PacketType_options},
    
    { label:"MessageType", type:"combo", id:"MessageType", options:MessageType_options, value: 'O'},
    { label:"OrderToken", type:"text", id:"OrderToken", value: '$msec_since_sod'},
    { label:"OrderBookID(Integer)", type:"combo", id:"OrderBookID", options:[]},
    
 

    { label:"Side", type:"combo", id:"Side", value: 'Buy', options:side_options},
    { label:"Quantity", type:"text", id:"Quantity", value: '0'},
   
    { label:"Price", type:"text", id:"Price", value: 300.12},
    { label:"TimeInForce", type:"combo", id:"TimeInForce",options: tif_options, value: '0'},
    
    { label:"OpenClose", type:"combo", id:"OpenClose", options: openclose_options, value: '0'},
    { label:"ClientAccount", type:"text", id:"ClientAccount", value: 300},
    { label:"CustomerInfo", type:"text", id:"CustomerInfo", value: 300},
    { label:"ExchangeInfo", type:"text", id:"ExchangeInfo", value: 300},
    { label:"ClearingParticipant", type:"text", id:"ClearingParticipant", value: '16000'},
    { label:"CrossingKey", type:"text", id:"CrossingKey", value: 11},
    
    
    { label:"Regulatory Data", type:"label" },
    { label:"CapacityOfParticipant", type:"combo", id:"CapacityOfParticipant", options: participant_capacity_options,value: 300},
    { label:"DirectedWholesale", type:"combo", id:"DirectedWholesale", options:directwholesale_options,value: 300},
    { label:"ExecutionVenue", type:"text", id:"ExecutionVenue", value: 300},
    { label:"IntermediaryID", type:"text", id:"IntermediaryID", value: 300},
    { label:"OrderOrigin", type:"text", id:"OrderOrigin", value: 300},
    { label:"Filler", type:"text", id:"Filler", value: 300},
    { label:".", type:"label" },
    
    { label:"OUCHOrderType", type:"combo", id:"OUCHOrderType", options: OUCHOrderType_options , value: '0'},
    { label:"ShortSellQuantity", type:"text", id:"ShortSellQuantity", value: '0'},
    { label:"MinimumAcceptableQuantity", type:"text", id:"MinimumAcceptableQuantity", value: '0'},

  ]
};

var propertysheet_cxl = {
  view:"property",  id:"sets_cxl",   width:450, nameWidth:200,
    on: {
 
    onAfterEditStop : handlerListEdit,
     onLiveEdit: handlerListEdit,
     onBeforeEditStop : handlerListEdit,
    onItemClick:handlerListEdit
  },
  elements:[
   
    { label:"ASX CXL REQUEST", type:"label" },
    { label:"PacketLength", type:"text", id:"PacketLength", value: 158},
    { label:"PacketType", type:"combo", id:"PacketType", value: 'U' , options: PacketType_options},
    { label:"MessageType", type:"combo", id:"MessageType", options:MessageType_options, value: 'O'},
    { label:"OrderToken", type:"text", id:"OrderToken", value: '$msec_since_sod'}
  
  ]
};

var propertysheet_mod = {
  view:"property",  id:"sets_mod",   width:450, nameWidth:200,
  
    on: {
 
    onAfterEditStop : handlerListEdit,
     onLiveEdit: handlerListEdit,
     onBeforeEditStop : handlerListEdit,
    onItemClick:handlerListEdit
  },
  
  elements:[
    { label:"ASX AMEND REQEST", type:"label" },
    { label:"PacketLength", type:"text", id:"PacketLength", value: 158},
      { label:"PacketType", type:"combo", id:"PacketType", value: 'U' , options: PacketType_options},
    { label:"MessageType", type:"combo", id:"MessageType", options:MessageType_options, value: 'O'},
    { label:"ExistingOrderToken", type:"text", id:"ExistingOrderToken", value: ''},
   { label:"ReplacementOrderToken", type:"text", id:"ReplacementOrderToken", value: ''},
    { label:"Quantity", type:"text", id:"Quantity", value: ''},
    { label:"Price", type:"text", id:"Price", value: 1.2},
    { label:"OpenClose", type:"combo", id:"OpenClose", options: openclose_options, value: '0'},
    { label:"ClientAccount", type:"text", id:"ClientAccount", value: 300},
    
    { label:"CustomerInfo", type:"text", id:"CustomerInfo", value: 300},
    { label:"ExchangeInfo", type:"text", id:"ExchangeInfo", value: 300},
   
    
    { label:"Regulatory Data", type:"label" },
    { label:"CapacityOfParticipant", type:"combo", id:"CapacityOfParticipant", options: participant_capacity_options,value: 300},
    { label:"DirectedWholesale", type:"select", id:"DirectedWholesale", options:directwholesale_options,value: 300},
    { label:"ExecutionVenue", type:"text", id:"ExecutionVenue", value: 300},
    { label:"IntermediaryID", type:"text", id:"IntermediaryID", value: 300},
    { label:"OrderOrigin", type:"text", id:"OrderOrigin", value: 300},
    { label:"Filler", type:"text", id:"Filler", value: 300},
    { label:".", type:"label" },
    
   { label:"ShortSellQuantity", type:"text", id:"ShortSellQuantity", value: '0'},
    { label:"MinimumAcceptableQuantity", type:"text", id:"MinimumAcceptableQuantity", value: '0'},

  ]
};



var MessageTemplateLists = [
{"id":1,"title":"NEW_ORDER_LIMIT", PacketType:'U' , MessageType: 'O' , OUCHOrderType : 'Y'},
{"id":2,"title":"CXL_REQUEST", PacketType:'U' , MessageType: 'X' },
{"id":3,"title":"AMEND_REQUEST", PacketType:'U' , MessageType: 'U' },
  
{"id":4,"title":"N-Centre Point – Mid-point only", PacketType:'U' , MessageType: 'O' , OUCHOrderType : 'N'},
{"id":5,"title":"D-Centre Point – Dark Limit Order", PacketType:'U' , MessageType: 'O' , OUCHOrderType : 'D'},
{"id":6,"title":"S-Centre Point – Sweep Order", PacketType:'U' , MessageType: 'O' , OUCHOrderType : 'S'},
{"id":7,"title":"P-Centre Point – Dual-posted Sweep Order", PacketType:'U' , MessageType: 'O' , OUCHOrderType : 'P'},
{"id":8,"title":"B-Centre Point – Block w/ MAQ Order", PacketType:'U' , MessageType: 'O' , OUCHOrderType : 'B'},
{"id":9,"title":"F-Centre Point – Dark Limit w/ MAQ Order", PacketType:'U' , MessageType: 'O' , OUCHOrderType : 'F'},
{"id":10,"title":"T-Centre Point – Limit Sweep w/ MAQ Order", PacketType:'U' , MessageType: 'O' , OUCHOrderType : 'T'},
{"id":11,"title":"C-Centre Point – Any Price Block Order", PacketType:'U' , MessageType: 'O' , OUCHOrderType : 'C'},
{"id":12,"title":"E-Centre Point – Any Price Block w/ MAQ Order", PacketType:'U' , MessageType: 'O' , OUCHOrderType : 'E'},
  
{"id":13,"title":"Y-Limit order.", PacketType:'U' , MessageType: 'O',  OUCHOrderType : 'Y'},
{"id":14,"title":"N-Centre Point Order (mid-point only). o Price > 0 defines a Centre Point Limit order. Price = 0 defines a Centre Point Market order.", PacketType:'U' , MessageType: 'O' , OUCHOrderType : 'N'},
{"id":15,"title":"D-Centre Point Order (‘dark limit’ order with mid-tick flag enabled).", PacketType:'U' , MessageType: 'O', OUCHOrderType : 'D'},
{"id":16,"title":"S-Sweep order. Price > 0 defines a Limit Sweep order. Price = 0 defines a Market-to- Limit Sweep order.", PacketType:'U' , MessageType: 'O' , OUCHOrderType : 'S'},
{"id":17,"title":"P-Sweep order (dual posted, i.e. midtick flag is enabled).", PacketType:'U' , MessageType: 'O' , OUCHOrderType : 'P'},
{"id":18,"title":"B-Mid-point Centre Point Block Order with single fill MAQ", PacketType:'U' , MessageType: 'O' , OUCHOrderType : 'B'},
{"id":19,"title":"F-Dark limit Centre Point Block Order with single fill MAQ", PacketType:'U' , MessageType: 'O' , OUCHOrderType : 'F'},
{"id":20,"title":"T-Centre Point Sweep Order with single fill MAQ", PacketType:'U' , MessageType: 'O' , OUCHOrderType : 'T'}

]

//console.log( _.map(MessageTemplateLists, (v)=>{ return(JSON.stringify(v))}).join(",\n"));

var list1 = { 
  id: 'list1',
  view:"list",
  width:350,
  //height:200,
  template:"#title#",
  on: {
    onSelectChange: handlerListClick
  },
 select:true,
  data:MessageTemplateLists
    };



const defaults_new_order =
  { 

  PacketLength: 158,
  PacketType: 'U',
  MessageType: 'O',
  OrderToken: '995000375     ',
  OrderBookID: parseInt('01EE4D',16),
  Side: 'B',
  Quantity: 1000,
  Price: "38.300",
  TimeInForce: 3,
  OpenClose: 0,
  ClientAccount: '   ',
  CustomerInfo: '               ',
  ExchangeInfo: '                                ',
  ClearingParticipant: '6',
  CrossingKey: 5,
  CapacityOfParticipant: 'A',
  DirectedWholesale: 'Y',
  ExecutionVenue: '    ',
  IntermediaryID: '          ',
  OrderOrigin: '9999           ',
  Filler: '        ',
  OUCHOrderType: 'Y',
  ShortSellQuantity: 0,
  MinimumAcceptableQuantity: 0 }


const defaults_cxl_order =
  { 
  PacketLength: 16,
  PacketType: 'U',
  MessageType: 'X',
  OrderToken: '12345',
  }

const defaults_mod_order =
  { 
  PacketLength: 161,
  PacketType: 'U',
  MessageType: 'U',
  ExistingOrderToken:'',
  ReplacementOrderToken:'',
   Quantity:'100',
   Price:'1.23',
   OpenClose:'0',
   ClientAccount:'',
    CustomerInfo:'',
    ExchangeInfo:'',
    CapacityOfParticipant:'A',
    DirectedWholesale:'Y',
    ExecutionVenue:'',
    IntermediaryID:'',
    OrderOrigin:'',
    Filler:'',
    ShortSellQuantity:'0',
    MinimumAcceptableQuantity:'0'
  }



var textarea1=  { id:'textarea1', view:"textarea", autoheight:true, label:"Result HEX String", labelPosition:"top",
                 value:''
                };
var textarea2=  { id:'textarea2', view:"textarea", autoheight:true, label:"Result JSON String", labelPosition:"top", 
                 value: JSON.stringify(defaults_new_order, null, 2) };



webix.ui({
  cols:
  [
    {rows:[list1] },
    { rows:[propertysheet_ord,propertysheet_cxl,propertysheet_mod]},
    {rows:[textarea1,textarea2]}
  ]
});


$$("sets_ord").setValues(defaults_new_order);
$$("sets_cxl").hide();
$$("sets_mod").hide();


webix.ajax(global_symbolfile,'txt').then(function(data){
  
  
  let  symbol_options =( _.tail( _.map( _.split(data.text(),'\n'),(line)=>{arr =_.split(line,'|');
                                          // console.log(arr);
                                  normalized_id = parseInt( _.padStart(arr[8],8,'0'),16);
                                  normalized_value = [arr[2],'.AX',' (x',arr[8], ' INT:',normalized_id,')'].join('');
                                            return {id:normalized_id,value:normalized_value} 
                                                                  })));
  
      //$$("symbolList").config.data(['wee','sin','sac']); 
         // $$("symbolList").getList().parse(symbol_options)
                            $$("sets_ord").getItem('OrderBookID' ).collection.parse(symbol_options)  
});


function handlerListClick(id, e, node){
//console.log(_.get($$('list1').getSelectedItem(true),'0'));
  
  let selectedItem = _.get($$('list1').getSelectedItem(true),'0');
  
  let currentPropertySheet = $$("sets_ord");
  let currentDefaults =defaults_new_order;
  
    if (_.get(selectedItem,'MessageType')==='O'){
     $$("sets_ord").show();
     $$("sets_cxl").hide();
     $$("sets_mod").hide();
    
    currentPropertySheet = $$("sets_ord");
        currentDefaults =defaults_new_order;
   // console.log('cxl!!');
    
  }
  
  if (_.get(selectedItem,'MessageType')==='X'){
     $$("sets_ord").hide();
     $$("sets_cxl").show();
     $$("sets_mod").hide();
    currentPropertySheet = $$("sets_cxl");
    currentDefaults = defaults_cxl_order;
   // console.log('cxl!!');
    
  }
  
    if (_.get(selectedItem,'MessageType')==='U'){
     $$("sets_ord").hide();
     $$("sets_cxl").hide();
     $$("sets_mod").show();
    currentPropertySheet = $$("sets_mod");
      currentDefaults =  defaults_mod_order
    //console.log('mod!!');
    
  }
  
   currentPropertySheet.setValues( 
           _.assign(
             currentDefaults,             
              _.pick( selectedItem,['OUCHOrderType','PacketType','MessageType'])
                                     ));
  
    $$('textarea2').setValue( JSON.stringify(currentPropertySheet.getValues(),null,2));

 var hexstring = global_ASX_OUCH_ENCODE(
 
     _.values(_.pick( selectedItem,['PacketType','MessageType'])).join('')                                   
                                        ,currentPropertySheet.getValues()).toString('hex');

  $$('textarea1').setValue( hexstring);
   
}




function handlerListEdit(){
  
  let selectedItem = _.get($$('list1').getSelectedItem(true),'0');
   let currentPropertySheet = $$("sets_ord");
  switch( _.get(selectedItem,'MessageType')) {
   
    case 'O' :  currentPropertySheet = $$("sets_ord");
      			break;
   case 'X' :   currentPropertySheet = $$("sets_cxl");
      			break;
   case 'U' :   currentPropertySheet = $$("sets_mod");
      			break;
    default:    currentPropertySheet = $$("sets_ord");
                break;
  }
 
    $$('textarea2').setValue( JSON.stringify(currentPropertySheet.getValues(),null,2));
  
 var hexstring = global_ASX_OUCH_ENCODE(
 
     _.values(_.pick( selectedItem,['PacketType','MessageType'])).join('')                                   
                                        ,currentPropertySheet.getValues()).toString('hex');
  
  

  $$('textarea1').setValue( hexstring);
 
}

  // console.log(asx_ouch_parsers_lodash);

    const global_ASX_OUCH_DECODE = asx_ouch_parsers_lodash.ASX_OUCH_DECODE;
    const global_ASX_OUCH_ENCODE = asx_ouch_parsers_lodash.ASX_OUCH_ENCODE;
    const global_ASX_OUCH_FIELDS = asx_ouch_parsers_lodash.ASX_OUCH_FIELDS;
    const  global_ASX_OUCH_MESSAGES = asx_ouch_parsers_lodash.ASX_OUCH_MESSAGES;

$$("list1").select(1); // select first item in message template list by default

