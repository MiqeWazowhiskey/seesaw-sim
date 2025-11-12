# Seesaw Weight Balancing Simulation

## Thought Process and Design Decisions
The goal of this project was to simulate a seesaw where users can drop weights and see the plank tilt visually.

- **Torque-based tilt:** I decided to calculate the seesaw angle based on torque, using the formula `torque = weight × distance from pivot`.
- **Weight Movements:** I initially appended the weights as children of the container, which caused misalignment issues, so in the subsequent step, after the drop animation, I appended them as children of the board to ensure they move together with it.  
- **Normalization:** To prevent extreme tilts on the first weight drop, I normalized the torque relative to the maximum possible torque, ensuring the tilt remains proportional. (AI Assisted)
- **Animations:** When a user clicks on the seesaw, the weight first appears as a preview under the mouse. Once dropped, it smoothly animates downwards
- **Real-time feedback:** Mouse hover shows the weight preview, allowing users to place weights accurately.
- **Dynamic weight generation:** Each weight has a random size and color to make the interaction visually appealing and informative.
- **State persistence:** I used local storage to save dropped weights and logs, allowing the simulation to survive page refreshes.
- **Dashboard:** Designed for a better user experience, displaying the angle, left and right total weights, and the next weight.

## Trade-offs and Limitations
- The requirements, including the bonuses, have been fully implemented; the limitations below are based on my observations.
- **Responsiveness:** While the simulation is interactive on desktop, some mobile optimizations (like touch events) are not fully implemented.  

## AI Assistance
- I consulted AI for logic while calculating torque, normalization and updating angle.
- AI assisted to fix CSS syntax and find UI bugs.
