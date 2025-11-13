# Seesaw Weight Balancing Simulation

## Thought Process and Design Decisions

The goal of this project was to simulate a seesaw where users can drop weights and see the plank tilt visually.

- **Torque-based tilt:** I decided to calculate the seesaw angle based on torque, using the formula `torque = weight × distance from pivot`.
- **Normalization:** To prevent extreme tilts on the first weight drop, I normalized the torque relative to the maximum possible torque, ensuring the tilt remains proportional. (AI Assisted)
- **Board Tilt Animation:** The seesaw board itself rotates smoothly based on the torque difference between left and right sides. The tilt angle is calculated proportionally and capped at ±30°.
- **Weight Drop Animation:** When a user clicks on the seesaw, the weight first appears as a preview under the mouse. Once dropped, it smoothly animates downwards.
- **Weight Movements:** I initially appended the weights as children of the container, which caused misalignment issues, so in the subsequent step, after the drop animation, I appended them as children of the board to ensure they move together with it.
- **Real-time feedback:** Mouse hover shows the weight preview, allowing users to place weights accurately.
- **Dynamic weight generation:** Each weight has a random size and color to make the interaction visually appealing and informative.
- **State persistence:** I used local storage to save dropped weights and logs, allowing the simulation to survive page refreshes.
- **Dashboard:** Designed for a better user experience, displaying the angle, left and right total weights, and the next weight.
- **UI Enhancements:** Before starting the simulation, the playground blinks and a "Click to Drop" text is displayed to guide the user to start interacting.

## Trade-offs and Limitations

- The requirements, including the bonuses, have been fully implemented.

## AI Assistance

- I consulted AI for logic while calculating torque, normalization and updating angle.
- AI assisted to fix CSS syntax and find UI bugs.

<img width="1920" height="946" alt="Screenshot 2025-11-13 at 09 30 16" src="https://github.com/user-attachments/assets/e0710f6a-a6d2-44d2-b2d8-100babd7243f" />

<img width="1918" height="941" alt="Screenshot 2025-11-13 at 09 29 59" src="https://github.com/user-attachments/assets/8df046f2-d7ba-477b-81a4-7a45037be375" />

<img width="478" height="944" alt="Screenshot 2025-11-13 at 09 36 39" src="https://github.com/user-attachments/assets/babedd58-37da-4e55-9260-fb62361bb1c9" />
