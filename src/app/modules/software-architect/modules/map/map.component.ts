import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LocalStorageService } from 'ngx-webstorage';
import { JsPlumbService } from '../../../js-plumb/js-plumb.service';
import { JsPlumbEventService } from '../../../js-plumb/js-plumb-event.service';

@Component({
  selector: 'sa-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class SaMapComponent implements AfterViewInit, OnDestroy {
  private jsPlumbInstance;
  private subscription: Subscription;

  constructor(
    jsPlumbService: JsPlumbService,
    private jsPlumbEventService: JsPlumbEventService,
    private localStorage: LocalStorageService
  ) {
    this.jsPlumbInstance = jsPlumbService.getInstance();
  }

  ngAfterViewInit(): void {
    this.loadBoxs();
    this.positionateBox();

    this.subscription = this.jsPlumbEventService.getEventListner().subscribe(event => {
      if (event != null && event.eventName != null) {
        this.movedBoxEvent(event);
      }
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private boxPosition = {};

  private positionateBox() {
    this.boxPosition = this.getBoxPositionInStorage();
  }
  private getBoxPositionInStorage() {
    var boxPositionInStorage = this.localStorage.retrieve('boxPosition');
    if (boxPositionInStorage == null) {
      boxPositionInStorage = {};
    }
    return boxPositionInStorage;
  }

  private changed : boolean = false;
  private somethingToSave() {
    if(this.changed){
      return true;
    }
  }
  private save() {
    this.localStorage.store('boxPosition', this.boxPosition);
    this.changed = false;
  }


  private movedBoxEvent(event) {
    this.boxPosition[event.info.nativeElement.id] = {
      'top': event.info.nativeElement.style.top,
      'left': event.info.nativeElement.style.left
    };
    this.changed = true;
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

  private boxs = new Array();
  private connections = new Array();

  publisher;
  subscriber;
  processWork;

  private loadBoxs() {
    this.elaborateBoxs(this.lotas);
    setTimeout(() => {
      this.createConnections();
    }, 0);
  }
  private elaborateBoxs(elements) {
    elements.forEach((element) => {
      this.elaborateBox(element);
    });
  }

  private elaborateBox(element) {
    if (this.isPublisher(element.type)) {
      this.publisher = element.elementInfo
      // Push element in box creation Array
      this.boxs.push({
        type: element.type,
        elementInfo: element.elementInfo
      });
    } else if (this.isSubscriber(element.type)) {
      this.subscriber = element.elementInfo;
      // Push element in box creation Array
      this.boxs.push(element);
      // Push info in connection creation Array
      this.connections.push({
        type: this.PublisherSubscriber,
        source: "p-" + this.publisher.id,
        target: "s-" + this.subscriber.id
      });

    } else if (this.isProcessWork(element.type)) {
      this.processWork = element.elementInfo;

      // Push info in connection creation Array
      this.processWork.publishers.forEach((publisher) => {
        this.connections.push({
          type: this.ProcessPublisher,
          source: "pw-" + this.processWork.id,
          target: "p-" + publisher.id
        });
      });
    }
    this.elaborateBoxs(element.child);
  }

  private createConnections() {
    this.connections.forEach((connection) => {
      this.defaultConnectObjectParam.source = connection.source;
      this.defaultConnectObjectParam.target = connection.target;
      this.defaultConnectObjectParam.anchors = connection.type;
      this.jsPlumbInstance.connect(this.defaultConnectObjectParam);
    });
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
