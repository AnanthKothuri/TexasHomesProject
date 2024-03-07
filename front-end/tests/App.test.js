import React from 'react'
import { render, screen } from '@testing-library/react';
import App from '../src/App.js';

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