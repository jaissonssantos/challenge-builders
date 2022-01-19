import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface LocationProviderProps {
    children: ReactNode
}
  
export interface Location {
    name: string | null
    city: string | null
    district: string | null
    streetNumber: string | null
    postalCode: string | null
    street: string | null
    region: string | null
    country: string | null
    timezone: string | null
    latitude: number | null
    longitude: number | null
}
  
interface LocationContextData {
    location: Location
    isStorage: boolean
    onUpdateLocation(newLocation: Location): Promise<void>
}
  
const LocationContext = createContext({} as LocationContextData);
  
function LocationProvider({ 
    children 
}: LocationProviderProps) {
    const [location, setLocation] = useState<Location>({} as Location);
    const [isStorage, setStorage] = useState(true);
  
    const storageKey = "@Builders:location";
  
    const onUpdateLocation = async (newLocation: Location): Promise<void> => {
        setLocation(newLocation);
  
        await AsyncStorage.setItem(storageKey, JSON.stringify(newLocation));
    }
  
    useEffect(() => {
      async function handleOnStorageData() {
        const isStoraged = await AsyncStorage.getItem(storageKey);
  
        if (isStoraged) {
          const userLogged = JSON.parse(isStoraged) as Location;
          setLocation(userLogged);
        }
  
        setStorage(false);
      }
      handleOnStorageData();
    }, []);
  
    return (
      <LocationContext.Provider
        value={{
            location,
            isStorage,
            onUpdateLocation
        }}
      >
        {children}
      </LocationContext.Provider>
    );
}
  
function useLocation() {
    const context = useContext(LocationContext);
    return context;
}
  
export { 
    LocationProvider, 
    useLocation 
};
  