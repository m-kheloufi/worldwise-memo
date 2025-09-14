import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import type { City } from "../Models/City";

// Context Type
type CitiesContextType = {
  cities: City[];
  isLoading: boolean;
  currentCity: City | null;
  getCity: (id: number) => void;
  createCity: (newCity: City) => void;
  deleteCity: (id: number) => void;
};
const CitiesContext = createContext<CitiesContextType | undefined>(undefined);

// Reducer
type StateType = {
  cities: City[];
  isLoading: boolean;
  currentCity: City | null;
};
const InitialState: StateType = {
  cities: [],
  isLoading: false,
  currentCity: null,
};

type Action =
  | { type: "fecthCities"; payload: City[] }
  | { type: "getCurrentCity"; payload: City }
  | { type: "addCity"; payload: City }
  | { type: "deletCity"; payload: number }
  | { type: "loading"; payload: boolean };

const reducer = (state: StateType, action: Action): StateType => {
  switch (action.type) {
    case "fecthCities":
      return { ...state, cities: action.payload };
    case "getCurrentCity":
      return { ...state, currentCity: action.payload };
    case "addCity":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "deletCity":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: null,
      };
    case "loading":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

// Provider
const CitiesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [{ currentCity, isLoading, cities }, dispatch] = useReducer(
    reducer,
    InitialState
  );

  useEffect(() => {
    const fetchCity = async () => {
      try {
        dispatch({ type: "loading", payload: true });
        const res = await fetch("http://localhost:8000/cities");
        const data: City[] = await res.json();
        dispatch({ type: "fecthCities", payload: data });
      } catch (err) {
        console.error(err);
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    };
    fetchCity();
  }, []);

  const getCity = useCallback(
    async (id: number) => {
      try {
        if (Number(id) === currentCity?.id) return;
        dispatch({ type: "loading", payload: true });
        const res = await fetch(`http://localhost:8000/cities/${id}`);
        const data: City = await res.json();
        dispatch({ type: "getCurrentCity", payload: data });
      } catch (err) {
        console.error(err);
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    },
    [currentCity]
  );

  const createCity = async (newCity: City) => {
    try {
      dispatch({ type: "loading", payload: true });
      const res = await fetch(`http://localhost:8000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: City = await res.json();
      dispatch({ type: "addCity", payload: data });
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  };

  const deleteCity = async (id: number) => {
    try {
      dispatch({ type: "loading", payload: true });
      await fetch(`http://localhost:8000/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "deletCity", payload: id });
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities: cities,
        isLoading: isLoading,
        currentCity: currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

// Hook
const useCities = () => {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
};
// eslint-disable-next-line react-refresh/only-export-components
export { useCities, CitiesProvider };
