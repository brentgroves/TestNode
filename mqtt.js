const mqtt = require('mqtt');
var moment = require("moment");

const MQTT_SERVER='localhost';
const MQTT_PORT='1882';


function main()
{
  console.log(`MQTT_SERVER=${MQTT_SERVER},MQTT_PORT=${MQTT_PORT}`);
  const mqttClient = mqtt.connect(`mqtt://${MQTT_SERVER}:${MQTT_PORT}`);

  mqttClient.on('connect', function() {
    const transDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    console.log(`mqtt transDate=>${transDate}`);

    console.log(`MQTT connection established`);
    let tcMsg = {
      CNC_Part_Operation_Key: 1,
      Set_No: 1,
      Block_No: 4,
      Actual_Tool_Assembly_Life: 55,
      Trans_Date: transDate,
    };

    let tcMsgString = JSON.stringify(tcMsg);
    console.log(`Published InsToolAssemblyChangeHistory => ${tcMsgString}`);
    mqttClient.publish("InsToolAssemblyChangeHistory", tcMsgString);

  });

}

main();