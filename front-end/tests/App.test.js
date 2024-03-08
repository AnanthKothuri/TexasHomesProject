import React from 'react'
import { render, screen } from '@testing-library/react';
import App from '../src/App.js';

const axios = require('axios').default;

  

//frontend test suite
    describe('Frontend Tests', () => {
        test('check that THP Splashpage header rendered', () => {
            render(<App />);
            const headerElements = screen.getAllByText(/Texas Homes Project/i, { selector: 'h1' });
            expect(headerElements.length).toBeGreaterThan(0); 
        });

        test('check that Logo rendered', () => {
            render(<App />);
            const homelessFeatures = screen.getAllByRole('img', {name: /Texas Homes Project Logo/i});
            expect(homelessFeatures.length).toBeGreaterThan(0); 
        });
        test('check if Heading rendered', () => {
            render(<App />);
            const navElement = screen.getAllByRole('heading', {name: /Texas Homes Project/i});
            expect(navElement.length).toBeGreaterThan(0); 
        });
        test('check if navigation rendered', () => {
            render(<App />);
            const navElement = screen.getAllByRole('navigation');
            expect(navElement.length).toBeGreaterThan(0); 
          });
        test('check if about button rendered', () => {
            render(<App />);
            const navElement = screen.getAllByRole('link', {name: /About/i});
            expect(navElement.length).toBeGreaterThan(0); 
        });
        test('check if Shelters button rendered', () => {
            render(<App />);
            const navElement = screen.getAllByRole('link', {name: /Shelters/i});
            expect(navElement.length).toBeGreaterThan(0); 
        });
        test('check if Counties button rendered', () => {
            render(<App />);
            const navElement = screen.getAllByRole('link', {name: /Counties/i});
            expect(navElement.length).toBeGreaterThan(0); 
        });
        test('check if Events button rendered', () => {
            render(<App />);
            const navElement = screen.getAllByRole('link', {name: /Events/i});
            expect(navElement.length).toBeGreaterThan(0); 
        });
        test('check if Home Page button rendered', () => {
            render(<App />);
            const navElement = screen.getAllByRole('link', {name: /Texas Homes Project/i});
            expect(navElement.length).toBeGreaterThan(0); 
        });
        test('check if Carousel Navigation rendered', () => {
            render(<App />);
            const navElement = screen.getAllByRole('button', {name: /Toggle Navigation/i});
            expect(navElement.length).toBeGreaterThan(0); 
        });
    });

// Backend test suite 
    describe('Backend API Tests', () => {
        describe('GET counties', () => {
            test('should return a list of counties', async () => {
                try {
                    const response = await axios.get('https://api.texashomesproject.me/counties/');
                    expect(response.status).toBe(200);
                    expect(Array.isArray(response.data)).toBe(true);
                } catch (error) {
                    console.error(error);
                }
            });
        });

        describe('GET county ID', () => {
            test('should return a specific county by id', async () => {
                try {
                    const response = await axios.get('https://api.texashomesproject.me/counties/1');
                    expect(response.status).toBe(200);
                    expect(response.data).toHaveProperty('id');
                } catch (error) {
                    console.error(error);
                }               
            });
        });

        describe('GET events', () => {
            test('should return a list of events', async () => {
                try {
                    const response = await axios.get('https://api.texashomesproject.me/events/');
                    expect(response.status).toBe(200);
                    expect(Array.isArray(response.data)).toBe(true);
                } catch (error) {
                    console.error(error);
                }
            });
        });

        describe('GET event ID', () => {
            test('should return a specific event by id', async () => {
                try {
                    const response = await axios.get('https://api.texashomesproject.me/events/1');
                    expect(response.status).toBe(200);
                    expect(response.data).toHaveProperty('id');
                } catch (error) {
                    console.error(error);
                } 
            });
        });


        describe('GET shelters', () => {
            test('should return a list of shelters', async () => {
                try {
                    const response = await axios.get('https://api.texashomesproject.me/shelters/');
                    expect(response.status).toBe(200);
                    expect(Array.isArray(response.data)).toBe(true);
                } catch (error) {
                    console.error(error);
                }
            });
        });

        describe('GET shelter ID', () => {
            test('should return a specific shelter by id', async () => {
                try {
                    const response = await axios.get('https://api.texashomesproject.me/shelters/1');
                    expect(response.status).toBe(200);
                    expect(response.data).toHaveProperty('id');
                } catch (error) {
                    console.error(error);
                } 
            });
        });
    });
