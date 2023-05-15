# Align-Viz: Pairwise Sequence Alignment Visualizer

## Description :clipboard:

Align-Viz is a user-friendly web-based tool designed to facilitate the visualization, interpretation, and analysis of sequence alignment results. Leveraging dynamic programming-based algorithms, Align-Viz provides an interactive platform for bioinformatics researchers, educators, and students to learn sequence alignment algorithms, eliminating the need for extensive bioinformatics expertise or external software.

## Sceenshots :camera:

Global Alignment Mode
![Global Alignment Mode](./public/global_demo.png?raw=true)

Local Alignment Mode
![Local Alignment Mode](./public/local_demo.png?raw=true)

## Features 🧬

- Needleman-Wunsch (Global alignment) and Smith-Waterman (Local alignment) algorithms.
- Dynamic real-time visualization of alignment matrices.
- Customizable scoring parameters for matches, mismatches, and gaps.
- Intuitive and user-friendly interface.
- No local installation required; accessible via the web.

## Usage 🧪

1. Enter sequences in the input fields.
2. Choose the alignment mode (Global or Local).
3. Specify scoring parameters for matches, mismatches, and gaps.
4. Click "Run" to initiate the alignment process.
5. Reset the visualizer or change parameters for another run.

## Built With :zap:

1. React
2. Typescript
3. Next JS

## Documentation :book:

For more detailed information on the project and the implementation of the algorithms, refer to the [documentation](./public/02-710_Genomics_Report.pdf)

## Deployment :rocket:

The application is deployed on the Vercel platform. Check out the live demo here. https://align-viz.vercel.app/

## Setup and Installation :wrench:

You need to have Node.js (v12 or above) and npm installed on your machine.

1. Clone the repository:

```bash
git clone https://github.com/ChouYunShuo/Align-Viz
cd align-viz
```

2. Install dependencies:
   The project dependencies are managed using Yarn. Once Yarn is installed, you can install the project dependencies by running:

```bash
yarn install
```

3. Start the development server
   After the dependencies are installed, you can start the development server by running:

```bash
yarn dev
```

The application should now be running at http://localhost:3000. Open it in your browser to confirm.

## Contributing :hammer:

We welcome contributions to this project. To contribute, please first discuss the changes you wish to make via issue, email, or any other method with the owners of this repository before making the changes.

After you have discussed your proposed changes, you can submit a pull request.

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

**[MIT license](http://opensource.org/licenses/mit-license.php)**
This project is licensed under the MIT License.

## Contact

If you have any questions, feel free to contact us. yunshuoc@andrew.cmu.edu
