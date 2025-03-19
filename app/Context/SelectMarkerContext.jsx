import { createContext } from "react";

const SelectMarkerContext = createContext({
  selectedMarker: null,
  setSelectedMarker: () => {} // Default function to avoid undefined errors
});

export default SelectMarkerContext;
