// 이 파일엔 Express를 사용하는 기능이 없으므로, Express를 불러올 필요가 없다.
// 각 함수가 각자 필요한 매개변수를 받아서, 그 매개변수를 사용해 응답을 보내는 역할만 한다.

const { v4: uuidv4 } = require("uuid");

const HttpError = require("../models/http-error");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
  },
];

const getPlaceByPlaceId = (req, res, next) => {
  // get 요청이기 때문에 URL에 있는 req.params.placeId에서 placeId를 가져올 수 있다.
  const placeId = req.params.placeId; // { placeId: 'p1' }
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  if (!place) {
    throw new HttpError("Could not find a place for the provided id.", 404);
  }

  res.status(200).json({ place: place });
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => {
    return p.creator === userId;
  });

  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find a places for the provided user id.", 404)
    );
  }

  res.status(200).json({ places: places });
};

const createPlace = (req, res, next) => {
  // 객체 구조 분할 할당(Object Destructuring Assignment)을 사용하여,
  // 들어오는 요청에 이 프로퍼티들이 있을 것으로 기대한다.
  // 나중에 유효성 검사를 추가할 것.
  const { title, description, coordinates, address, creator } = req.body;
  const createdPlace = {
    // 여기서 title, description, address, creator는
    // 프로퍼티 이름과 변수 이름이 같으므로 생략할 수 있다.
    // 즉, title: title, description: description, address: address, creator: creator로 쓴 것과 동일하다.
    // 단, coordinates는 객체이고, 프로퍼티 이름과 변수 이름이 다르므로 생략할 수 없다.
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  // push()는 배열의 마지막 요소로 추가한다.
  // 만약 createdPlace를 첫 번째 요소로 추가하고 싶다면 unshift()를 사용하면 된다.
  DUMMY_PLACES.push(createdPlace);

  // 새로 장소가 추가되었으므로, 201 상태 코드를 반환한다.
  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const palceIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[palceIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  // 장소가 일치하지 않으면 true를 반환하고, 그렇지 않으면 false를 반환한다.
  // 즉, placeId와 일치하는 장소는 제외하고, 나머지 장소들만 남긴다.
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "Deleted place." });
};

exports.getPlaceByPlaceId = getPlaceByPlaceId;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
