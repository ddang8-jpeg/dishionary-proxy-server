# Dishionary Proxy Server

A proxy server that allows users to take pictures of menus, extract dish names using OCR (Optical Character Recognition), and retrieve definitions and images for the dishes.

## Features

- **analyze-image**: Extract dish names from menu images.
- **define-dish**: Query food APIs to retrieve dish definitions and descriptions.

## Technologies Used

- **Node.js**: Server-side runtime environment.
- **Express.js**: Web framework for building the proxy server.
- **Google Custom Search API**: For fetching food images.
- **dotenv**: For managing environment variables.

## Prerequisites

- [Node.js](https://nodejs.org/) (>= 14.x)
- API keys for:
  - Google Custom Search API for food image retrieval.
  - Azure Computer Visions API Key for OCR

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/dishionary-proxy-server.git
   cd dishionary-proxy-server
