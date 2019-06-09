import { Component, AfterViewInit } from '@angular/core';
import { JsPlumbService } from '../../../js-plumb/js-plumb.service';

@Component({
  selector: 'sa-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class SaMapComponent implements AfterViewInit {
  jsPlumbInstance;

  constructor(jsPlumbService: JsPlumbService) {
    this.jsPlumbInstance = jsPlumbService.getInstance();
  }

  defaultConnectObjectParam = {
    source: "",
    target: "",
    anchors: [],
    endpoint: "Blank",
    connector: ["Flowchart"]
  };
  PublisherSubscriber = ["Bottom", "Top"];
  ProcessPublisher = ["Right", "Left"];
  ngAfterViewInit(): void {




    this.defaultConnectObjectParam.source = "a";
    this.defaultConnectObjectParam.anchors = this.PublisherSubscriber;
    this.defaultConnectObjectParam.target = "b";
    this.jsPlumbInstance.connect(this.defaultConnectObjectParam);

    this.defaultConnectObjectParam.source = "c";
    this.defaultConnectObjectParam.anchors = this.ProcessPublisher;
    this.defaultConnectObjectParam.target = "d";
    this.jsPlumbInstance.connect(this.defaultConnectObjectParam);
    this.defaultConnectObjectParam.target = "e";
    this.jsPlumbInstance.connect(this.defaultConnectObjectParam);



    this.esamina();
  }


  private boxs = new Array();
  connections = new Array();

  esamina() {
    this.cacca(this.lotas);
    setTimeout(() => {
      this.ciao();
    }, 0);

  }
  cacca(elements) {
    elements.forEach((element) => {
      this.lota(element);
    });
  }
  publisher;
  subscriber;
  processWork;

  ciao() {
    this.connections.forEach((connection) => {
      //console.log(connection);
      this.defaultConnectObjectParam.source = connection.source;
      this.defaultConnectObjectParam.target = connection.target;
      this.defaultConnectObjectParam.anchors = connection.type;
      this.jsPlumbInstance.connect(this.defaultConnectObjectParam);
    });

  }

  lota(element) {
    if (this.isPublisher(element.type)) {
      this.publisher = element.elementInfo
      this.boxs.push({
        type: element.type,
        elementInfo: element.elementInfo
      });
    } else if (this.isSubscriber(element.type)) {
      this.subscriber = element.elementInfo;

      this.boxs.push(element);

      //console.log("Collega: " + this.publisher.name + " (p-" + this.publisher.id + ")->" + this.subscriber.name + "(s-" + this.subscriber.id + ")");
      this.connections.push({
        type: this.PublisherSubscriber,
        source: "p-" + this.publisher.id,
        target: "s-" + this.subscriber.id
      });

    } else if (this.isProcessWork(element.type)) {
      this.processWork = element.elementInfo;

      console.log(element);
      this.processWork.publishers.forEach((publisher) => {
        //console.log("Collega: " + this.processWork.processAnagraphicName + " (pw-" + this.processWork.id + ")->" + publisher.name + " (p-" + publisher.id + ")");
        this.connections.push({
          type: this.ProcessPublisher,
          source: "pw-" + this.processWork.id,
          target: "p-" + publisher.id
        });
      });
    }
    this.cacca(element.child);
  }



  isPublisher(type) {
    if (type == "PUBLISHER") {
      return true;
    }
  }
  isSubscriber(type) {
    if (type == "SUBSCRIBER") {
      return true;
    }
  }
  isProcessWork(type) {
    if (type == "PROCESS_WORK") {
      return true;
    }
  }

  lotas = [
    {
      "type": "PUBLISHER",
      "elementInfo": {
        "id": 1,
        "name": "FEED",
        "projectId": 1,
        "projectName": "test-srp",
        "messageSpecifications": [
          {
            "id": 1,
            "name": "Message of feed1 - type A",
            "openApiDoc": "a"
          },
          {
            "id": 2,
            "name": "Message of feed1 - type B",
            "openApiDoc": "a"
          }
        ]
      },
      "child": [
        {
          "type": "SUBSCRIBER",
          "elementInfo": {
            "id": 1,
            "name": "Queue of provider of FEED",
            "publisherId": 1,
            "publisherName": "FEED"
          },
          "child": [
            {
              "type": "PROCESS_WORK",
              "elementInfo": {
                "id": 1,
                "name": "1",
                "version": 1,
                "processAnagraphicId": 1,
                "processAnagraphicName": "Manage the incoming feed ...",
                "subscriberId": 1,
                "subscriberName": "Queue of provider of FEED",
                "publishers": [
                  {
                    "id": 2,
                    "name": "ProviderManager",
                    "projectId": 1,
                    "projectName": "test-srp",
                    "messageSpecifications": [
                      {
                        "id": 3,
                        "name": "Not found in provider message",
                        "openApiDoc": "A"
                      },
                      {
                        "id": 4,
                        "name": "pi-providers data message",
                        "openApiDoc": "a"
                      }
                    ]
                  }
                ]
              },
              "child": [
                {
                  "type": "PUBLISHER",
                  "elementInfo": {
                    "id": 2,
                    "name": "ProviderManager",
                    "projectId": 1,
                    "projectName": "test-srp",
                    "messageSpecifications": [
                      {
                        "id": 3,
                        "name": "Not found in provider message",
                        "openApiDoc": "A"
                      },
                      {
                        "id": 4,
                        "name": "pi-providers data message",
                        "openApiDoc": "a"
                      }
                    ]
                  },
                  "child": [
                    {
                      "type": "SUBSCRIBER",
                      "elementInfo": {
                        "id": 2,
                        "name": "MapperManager",
                        "publisherId": 2,
                        "publisherName": "ProviderManager"
                      },
                      "child": [
                        {
                          "type": "PROCESS_WORK",
                          "elementInfo": {
                            "id": 2,
                            "name": "1",
                            "version": 1,
                            "processAnagraphicId": 2,
                            "processAnagraphicName": "Map the provider message and add platform info",
                            "subscriberId": 2,
                            "subscriberName": "MapperManager",
                            "publishers": [
                              {
                                "id": 3,
                                "name": "MapperManager",
                                "projectId": 1,
                                "projectName": "test-srp",
                                "messageSpecifications": [
                                  {
                                    "id": 5,
                                    "name": "Mapped data with platform reference message",
                                    "openApiDoc": "a"
                                  }
                                ]
                              }
                            ]
                          },
                          "child": [
                            {
                              "type": "PUBLISHER",
                              "elementInfo": {
                                "id": 3,
                                "name": "MapperManager",
                                "projectId": 1,
                                "projectName": "test-srp",
                                "messageSpecifications": [
                                  {
                                    "id": 5,
                                    "name": "Mapped data with platform reference message",
                                    "openApiDoc": "a"
                                  }
                                ]
                              },
                              "child": [
                                {
                                  "type": "SUBSCRIBER",
                                  "elementInfo": {
                                    "id": 3,
                                    "name": "OfferManager - Offer1",
                                    "publisherId": 3,
                                    "publisherName": "MapperManager"
                                  },
                                  "child": [
                                    {
                                      "type": "PROCESS_WORK",
                                      "elementInfo": {
                                        "id": 3,
                                        "name": "1",
                                        "version": 1,
                                        "processAnagraphicId": 3,
                                        "processAnagraphicName": "Create offer from feed of mapped queue and apply rules",
                                        "subscriberId": 3,
                                        "subscriberName": "OfferManager - Offer1",
                                        "publishers": []
                                      },
                                      "child": []
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "PUBLISHER",
      "elementInfo": {
        "id": 4,
        "name": "Anagrafic Event",
        "projectId": 5,
        "projectName": "unyon",
        "messageSpecifications": [
          {
            "id": 6,
            "name": "Anagrafic - New",
            "openApiDoc": "a"
          },
          {
            "id": 7,
            "name": "Anagrafic - Edit",
            "openApiDoc": "a"
          }
        ]
      },
      "child": [
        {
          "type": "SUBSCRIBER",
          "elementInfo": {
            "id": 4,
            "name": "Apollo",
            "publisherId": 4,
            "publisherName": "Anagrafic Event"
          },
          "child": [
            {
              "type": "PROCESS_WORK",
              "elementInfo": {
                "id": 4,
                "name": "1",
                "version": 1,
                "processAnagraphicId": 4,
                "processAnagraphicName": "Synchronize anagraphic of new software with old Apollo",
                "subscriberId": 4,
                "subscriberName": "Apollo",
                "publishers": []
              },
              "child": []
            }
          ]
        },
        {
          "type": "SUBSCRIBER",
          "elementInfo": {
            "id": 5,
            "name": "CRM",
            "publisherId": 4,
            "publisherName": "Anagrafic Event"
          },
          "child": [
            {
              "type": "PROCESS_WORK",
              "elementInfo": {
                "id": 10,
                "name": "1",
                "version": 1,
                "processAnagraphicId": 5,
                "processAnagraphicName": "Synchronize anagraphic of new software with old CRM",
                "subscriberId": 5,
                "subscriberName": "CRM",
                "publishers": []
              },
              "child": []
            }
          ]
        }
      ]
    }
  ];

}
