export enum WeatherType {
    Clear = 'Clear',
    Clouds = 'Clouds',
    Sunny = 'Sunny',
    Rain = 'Rain',
    Snow = 'Snow',
}
  
export enum WeatherTitle {
    Clear = 'Limpo',
    Clouds = 'Nuvens',
    Sunny = 'Sol',
    Rain = 'Chuva',
    Snow = 'Neve',
}
  
export enum WeatherColor {
    Clear = '#494e9c',
    Clouds = '#a3a3c6',
    Sunny = '#f2936e',
    Rain = '#9093c8',
    Snow = '#646db1',
}
  
export interface WeatherData {
    id: number
    main: string
}