// src/types.ts

export interface WeatherData {
    main: {
      temp: number;
      humidity: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
  }
  
  export interface WeatherResponse {
    name: string;
    sys: {
      country: string;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
    main: {
      temp: number;
      humidity: number;
    };
    wind: {
      speed: number;
    };
  }

  export interface SearchBtnProps{
      value: string;
      onChange: React.ChangeEventHandler<HTMLInputElement>;
      placeholder:string;
      type:string;
      onClick: React.MouseEventHandler<HTMLButtonElement>;
      disabled?: boolean;
      loading?: boolean;
      label:string;
      id:string,
  }

  export interface NewsResponseProps{

source:{
    id?: string | null;
    name:string;
}
author:string;
title:string;
description:string;
url:string
uulToImage:string;
publishedAt:string;
content:string;

  }

  export interface InputFieldProps{
  
      id: string;
      label: string;
      type: string;
      placeholder: string;
      value: string;
      onChange: React.ChangeEventHandler<HTMLInputElement>;
      required?: boolean;
  }

  export interface TodoItem {
id: number;
task: string;
completed: boolean;


  }


