var roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  "Marketplace-Farm",
  "Marketplace-Post Office",
  "Marketplace-Shop",
  "Marketplace-Town Hall",
  "Shop-Town Hall"
];

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

var roadGraph = buildGraph(roads);

var VillageState = class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels
        .map(p => {
          if (p.place != this.place) return p;
          return { place: destination, address: p.address };
        })
        .filter(p => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function randomRobot(state) {
  return { direction: randomPick(roadGraph[state.place]) };
}

VillageState.random = function (parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({ place, address });
  }
  return new VillageState("Post Office", parcels);
};

var mailRoute = [
  "Alice's House",
  "Cabin",
  "Alice's House",
  "Bob's House",
  "Town Hall",
  "Daria's House",
  "Ernie's House",
  "Grete's House",
  "Shop",
  "Grete's House",
  "Farm",
  "Marketplace",
  "Post Office"
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1) };
}

function findRoute(graph, from, to) {
  let work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some(w => w.at == place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
}

function goalOrientedRobot({ place, parcels }, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}

function findClosestParcelRobot({ place, parcels }, route) {
  function findShortestRoute(routes) {
    return routes.reduce((currentShortestRoute, route) => {
      if (!currentShortestRoute) return route;
      return currentShortestRoute.length > route.length ? route : currentShortestRoute;
    });
  }

  if (route.length == 0) {
    let pickedUpParcelList = parcels.filter(parcel => parcel.place === place);
    let untouchedParcelList = parcels.filter(parcel => parcel.place !== place);

    let routesToUntouchedParcels = untouchedParcelList.map(parcel =>
      findRoute(roadGraph, place, parcel.place)
    );
    if (pickedUpParcelList.length === 0) {
      route = findShortestRoute(routesToUntouchedParcels);
    } else {
      let parcelDestinationRouteList = pickedUpParcelList.map(parcel =>
        findRoute(roadGraph, place, parcel.address)
      );
      route = findShortestRoute([...routesToUntouchedParcels, ...parcelDestinationRouteList]);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}

function compareRobots(robot1, memory1, robot2, memory2) {
  function runRobot(state, robot, memory) {
    for (let turn = 0; ; turn++) {
      if (state.parcels.length == 0) {
        return turn;
      }
      let action = robot(state, memory);
      state = state.move(action.direction);
      memory = action.memory;
    }
  }
  let robot1Count = 0;
  let robot2Count = 0;
  const taskCount = 100;
  for (let i = 0; i < taskCount; i++) {
    let randomVillageState = VillageState.random();
    robot1Count += runRobot(randomVillageState, robot1, memory1);
    robot2Count += runRobot(randomVillageState, robot2, memory2);
  }
  console.log(`Robot 1 took an average ${robot1Count / taskCount} steps per task`);
  console.log(`Robot 2 took an average ${robot2Count / taskCount} steps per task`);
}

compareRobots(findClosestParcelRobot, [], goalOrientedRobot, []);
