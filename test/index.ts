import { expect } from "chai";
import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { Greeter__factory } from "../typechain-types";

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const signers = await ethers.getSigners();
    const greeter = await new Greeter__factory(signers[0]).deploy(
      "Hello, world!"
    );

    expect(await greeter.greet()).to.equal("Hello, world!");
    expect(await greeter.owner()).to.equal(signers[0].address);

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
