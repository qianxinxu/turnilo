/*
 * Copyright 2017-2019 Allegro.pl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { expect } from "chai";
import { isFloorableDuration, isValidDuration } from "./duration";

describe("Chronoshift Duration", () => {
  describe("isValidDuration", () => {
    it("should return false for invalid durations", () => {
      expect(isValidDuration(null), "<null>").to.equal(false);
      expect(isValidDuration(""), "empty string").to.equal(false);
      expect(isValidDuration("1234"), "number").to.equal(false);
      expect(isValidDuration("1D"), "duration without leading P").to.equal(false);
      expect(isValidDuration("P1H"), "hour duration without T").to.equal(false);
    });

    it("should return true for valid durations", () => {
      expect(isValidDuration("PT1H"), "one hour").to.equal(true);
      expect(isValidDuration("P2D"), "two days").to.equal(true);
      expect(isValidDuration("P3W"), "three weeks").to.equal(true);
      expect(isValidDuration("P2M"), "two months").to.equal(true);
      expect(isValidDuration("P5Y"), "five years").to.equal(true);
    });
  });

  describe("isFloorableDuration", () => {
    it("should return false for invalid durations", () => {
      expect(isFloorableDuration(null), "<null>").to.equal(false);
      expect(isFloorableDuration(""), "empty string").to.equal(false);
      expect(isFloorableDuration("1234"), "number").to.equal(false);
      expect(isFloorableDuration("1D"), "duration without leading P").to.equal(false);
      expect(isFloorableDuration("P1H"), "hour duration without T").to.equal(false);
    });

    it("should return false for not floorable durations", () => {
      expect(isFloorableDuration("PT5H"), "five hours").to.equal(false);
      expect(isFloorableDuration("P2D"), "two days").to.equal(false);
      expect(isFloorableDuration("P3D"), "three days").to.equal(false);
      expect(isFloorableDuration("P5M"), "five months").to.equal(false);
      expect(isFloorableDuration("P3W"), "three weeks").to.equal(false);
    });

    it("should return true for floorable durations", () => {
      expect(isFloorableDuration("PT1H"), "one hour").to.equal(true);
      expect(isFloorableDuration("PT2H"), "two hours").to.equal(true);
      expect(isFloorableDuration("P2M"), "two months").to.equal(true);
      expect(isFloorableDuration("P5Y"), "five years").to.equal(true);
    });
  });
});
