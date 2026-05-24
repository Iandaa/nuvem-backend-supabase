//import express from 'express';
const express = require('express');

//import createClient from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
//import {createClient} from '@supabase/supabase-js'
const supabaseClient = require('@supabase/supabase-js');

//import morgan from 'morgan';
const morgan = require('morgan');

//import bodyParser from "body-parser";
const bodyParser = require('body-parser');

//import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js";

const app = express();

const cors = require("cors");

const corsOptions = {
   origin: '*',
   credentials: true,            //access-control-allow-credentials:true
   optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

// using morgan for logs
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const supabase =
    supabaseClient.createClient(
        'https://zvdqclbyyjcayxmbrxab.supabase.co',
        'SUA_CHAVE_SUPABASE'
    )

app.get('/products', async (req, res) => {

    const { data, error } = await supabase
        .from('products')
        .select()

    if (error) {
        console.log(error);
        return res.status(500).json(error);
    }

    console.log(data);

    res.json(data);
});

app.get('/products/:id', async (req, res) => {

    console.log("id = " + req.params.id);

    const { data, error } = await supabase
        .from('products')
        .select()
        .eq('id', req.params.id)

    if (error) {
        console.log(error);
        return res.status(500).json(error);
    }

    console.log(data);

    res.json(data);
});

app.post('/products', async (req, res) => {

    const { error } = await supabase
        .from('products')
        .insert({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
        })

    if (error) {
        console.log(error);
        return res.status(500).json(error);
    }

    console.log(req.body);

    res.json({
        message: "created!!"
    });

});

app.put('/products/:id', async (req, res) => {

    const { error } = await supabase
        .from('products')
        .update({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        })
        .eq('id', req.params.id)

    if (error) {
        console.log(error);
        return res.status(500).json(error);
    }

    res.json({
        message: "updated!!"
    });
});

app.delete('/products/:id', async (req, res) => {

    console.log("delete: " + req.params.id);

    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', req.params.id)

    if (error) {
        console.log(error);
        return res.status(500).json(error);
    }

    res.json({
        message: "deleted!!"
    });

    console.log("delete: " + req.params.id);

});

app.get('/', (req, res) => {
    res.send("Hello I am working my friend Supabase <3");
});

app.use((req, res) => {
    res.status(404).send("Hello again I am working my friend to the moon and behind <3");
});

app.listen(3000, '0.0.0.0', () => {
    console.log('> Ready on http://0.0.0.0:3000');
});