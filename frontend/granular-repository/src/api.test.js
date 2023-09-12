import axios from 'axios';

// jest.mock("axios");

describe('API test',() => {
    test('Get datasets',async ()=>{
        try{
            const response = await axios.get('http://178.128.198.118:8000/datasets/page:1');
            expect(response).toBeDefined();
            expect(response.status).toEqual(200);
            expect(response.data.length).toBeGreaterThan(0);
        } catch(error){
            console.log(error.message)
        }
        
    });
});

describe('API test',() => {
    test('Get datasets',async ()=>{
        try{
            const response = await axios.get('http://178.128.198.118:8000/dataset/1');
            expect(response).toBeDefined();
            expect(response.status).toEqual(200);
            expect(response.data.length).toBeGreaterThan(0);
        } catch(error){
            console.log(error.message)
        }
        
    });
});

describe('API test',() => {
    test('Get datasets',async ()=>{
        try{
            const response = await axios.get('http://178.128.198.118:8000/datasets/keyword/All/1');
            expect(response).toBeDefined();
            expect(response.status).toEqual(200);
            expect(response.data.length).toBeGreaterThan(0);
        } catch(error){
            console.log(error.message)
        }
        
    });
});

describe('API test',() => {
    test('Get datasets',async ()=>{
        try{
            const response = await axios.get('http://178.128.198.118:8000/datasets/popular');
            expect(response).toBeDefined();
            expect(response.status).toEqual(200);
            expect(response.data.length).toBeGreaterThan(0);
        } catch(error){
            console.log(error.message)
        }
        
    });
});

describe('API test',() => {
    test('Get datasets',async ()=>{
        try{
            const response = await axios.get('http://178.128.198.118:8000/datasets/recent');
            expect(response).toBeDefined();
            expect(response.status).toEqual(200);
            expect(response.data.length).toBeGreaterThan(0);
        } catch(error){
            console.log(error.message)
        }
        
    });
});

describe('API test',() => {
    test('Get datasets',async ()=>{
        try{
            const response = await axios.get('http://178.128.198.118:8000/datasets/count');
            expect(response).toBeDefined();
            expect(response.status).toEqual(200);
            expect(response.data.length).toBeGreaterThan(0);
        } catch(error){
            console.log(error.message)
        }
        
    });
});
describe('API test',() => {
    test('Get datasets',async ()=>{
        try{
            const response = await axios.get('http://178.128.198.118:8000/datasets/similar/10');
            expect(response).toBeDefined();
            expect(response.status).toEqual(200);
            expect(response.data.length).toBeGreaterThan(0);
        } catch(error){
            console.log(error.message)
        }
        
    });
});
describe('API test',() => {
    test('Get datasets',async ()=>{
        try{
            const response = await axios.get('http://178.128.198.118:8000/categories');
            expect(response).toBeDefined();
            expect(response.status).toEqual(200);
            expect(response.data.length).toBeGreaterThan(0);
        } catch(error){
            console.log(error.message)
        }
        
    });
});