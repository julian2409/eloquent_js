const roads = [
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
  "Shop-Town Hall",
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
  for (let [from, to] of edges.map((r) => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}
const roadGraph = buildGraph(roads);

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }
  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels
        .map((p) => {
          if (p.place != this.place) return p;
          return { place: destination, address: p.address };
        })
        .filter((p) => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
}

function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      // console.log(`Done in ${turn} turns`);
      return turn;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    // console.log(`Moved to ${action.direction}`);
  }
}

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

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

const mailRoute = [
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
  "Post Office",
];

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
      if (!work.some((w) => w.at == place)) {
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

function compareRobots(robot1, memory1, robot2, memory2) {
  let results1 = [], results2 = [];
  for (let i = 0; i < 10000; i++) {
    let state = VillageState.random();
    results1.push(runRobot(state, robot1, memory1));
    results2.push(runRobot(state, robot2, memory2));
    console.log("Round: " + i);
  }
  let average1 = results1.reduce((a, b) => a + b) / 10000;
  let average2 = results2.reduce((a, b) => a + b) / 10000;

  console.log(`Robot1 was done in around ${average1} turns, Robot2 needed ${average2}`);
}

function checkClosest(parcels, graph, place) {
  if (parcels == undefined || parcels.length == 0) {
    return { parcels: null, Infinity };
  }

  let shortestPath = Infinity, closestParcels = parcels;

  for(let parcel of parcels) {
    let pathToParcelLength = findRoute(graph, place, parcel.place).length;
    if (pathToParcelLength < shortestPath) {
      shortestPath = pathToParcelLength;
    } else {
      closestParcels = closestParcels.filter(parcel => findRoute(graph, place, parcel.place).length <= shortestPath);
    }
  }

  return { closestParcels: closestParcels, shortestPath: shortestPath };
}

function simulateRobot(state, robot, memory) {
  for (let turn = 0; turn < 50; turn++) {
    if (state.parcels.length == 0) {
      // console.log(`Done in ${turn} turns`);
      return turn;
    }
    let action = robot(state, memory);
    state = move(action.direction);
    memory = action.memory;
    // console.log(`Moved to ${action.direction}`);
  }
}

function improvedGoalOrientedRobot({place, parcels}, route) {
  let plannedRoute = route;

  let uncollectedParcels = parcels.filter(parcel => parcel.place !== place) || [];
  let heldParcels = parcels.filter(parcel => parcel.place === place) || [];

  let { closestParcels: closestUncollected, shortestPath: distanceUncollected }
        = checkClosest(uncollectedParcels, roadGraph, place);
  let { closestParcels: closestHeld, shortestPath: distanceDropoffs }
        = checkClosest(heldParcels, roadGraph, place);

  if (closestUncollected == null) {
    route = findRoute(roadGraph, place, closestHeld[0].address);
  } else if (closestHeld == null) {
    route = findRoute(roadGraph, place, closestUncollected[0].place);
  } else if (distanceUncollected == distanceDropoffs) {
    let nextDestination = closestHeld.length > closestUncollected.length ? closestHeld[0].address : closestUncollected[0].place
    route = findRoute(roadGraph, place, nextDestination);
  } else {
    let nextDestination = distanceUncollected > distanceDropoffs ? closestHeld[0].address : closestUncollected[0].place
    route = findRoute(roadGraph, place, nextDestination);
  }

  if (plannedRoute.length < route.length && plannedRoute.length !== 0) {
    return { direction: plannedRoute[0], memory: plannedRoute.slice(1) };
  }

  return { direction: route[0], memory: route.slice(1) }
}

compareRobots(improvedGoalOrientedRobot, [], goalOrientedRobot, []);
