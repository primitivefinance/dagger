# 🗡️ Dagger

An online non-custodial asset management platform built on top of DFMM.

## Deployments

| Designation  |  Network  |  Address |
|--- | --- | --- |
| DFMM  |  Optimism Sepolia  |  0x50FDF77C081f754dD28d2e54B9FD7E0eE14B7a69 |
| G3M  |  Optimism Sepolia  |  0xFd0E51D00A9E1E45402668Ec2C4FdC87AC8f2475 |
| LogNormal  |  Optimism Sepolia  |  0xaa26269D1CCd520473930C27C79EcB523Ac89B21 |


## Overview

The goal of Dagger is to provide a simple and secure web application to use DFMM strategies.

## Dependancies
- [Bun](https://bun.sh/)
- [dfmm-indexer](https://github.com/primitivefinance/dfmm-indexer)
    - Local deployment at `http://localhost:42069`
    - Optionally, define a hosted endpoint in `.env` variable `VITE_DFMM_INDEXER` 

## Installation
1. Clone this repository.
2. Use [Bun](https://bun.sh/) to install the dependencies with `bun install`.
3. Run `bun run dev` to launch run the app locally.
4. Have fun.


## GraphQL Queries
After editing GraphQL queries, run `bun codegen` to regenerate types.  