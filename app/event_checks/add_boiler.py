#!/usr/bin/env python3

from jinja2 import Template
import os

with open('template', 'r') as f:
    boiler = f.read()

for fn in os.listdir('.'):
    filename = fn[:-3]
    tm = Template(boiler)
    completed = tm.render(filename=filename)
    with open(fn, 'w') as js:
        js.write(completed)
    ##print(completed)
