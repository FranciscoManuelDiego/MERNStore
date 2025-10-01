"use client"
import { set } from 'mongoose';
import { useState, useEffect } from 'react';


// These interfaces define the shape of your data:
//The interfaces don't exist at runtime - they're just TypeScript compile-time checks. The actual data structure comes from your API mapping:
interface Province {
  id: string;
  name: string;
}
interface City {
  id: string;
  name: string;
  province: Province; 
}
 
export const useArgentinaLocations = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProvinces = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre');
        
        if (!response.ok) {
          throw new Error('Failed to fetch provinces');
        }

        const provincesData = await response.json();
        
        const mappedProvinces = provincesData.provincias.map((prov) => ({
          id: prov.id,
          name: prov.nombre,
        }));
        console.log('Mapped Provinces:', mappedProvinces); // Debug log
        setProvinces(mappedProvinces);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProvinces();
     }, []);

     const fetchCitiesByProvince = async (provinceId : string) => {
      setLoading(true);
      setCities([]); // Clear previous cities
      try {
       // Use municipios endpoint as per documentation
      const citiesResponse = await fetch(
        `https://apis.datos.gob.ar/georef/api/municipios?provincia=${provinceId}&campos=id,nombre&max=100`
      );
      if (!citiesResponse.ok) {
        throw new Error('Failed to fetch cities');
      }

       const data = await citiesResponse.json();

        // Map the API response to the desired format
      const mappedCities = data.municipios.map((city) => ({
        id: city.id,
        name: city.nombre,
        province: provinces.find(prov => prov.id === provinceId)
      }));
        console.log('Mapped Cities:', mappedCities); // Debug log
        setCities(mappedCities);
      } catch (error) {
        setError(error.message);
        setCities([]);
      } finally {
        setLoading(false);
      }
    };

  return { provinces, cities, loading, error , fetchCitiesByProvince};
};
