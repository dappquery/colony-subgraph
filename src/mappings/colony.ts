import { BigInt, log } from '@graphprotocol/graph-ts'

import {
  IColony,
  ColonyInitialised,
  ColonyBootstrapped,
  ColonyUpgraded,
  ColonyRoleSet,
  ColonyFundsMovedBetweenFundingPots,
  ColonyFundsClaimed,
  RewardPayoutCycleStarted,
  RewardPayoutCycleEnded,
  RewardPayoutClaimed,
  ColonyRewardInverseSet,
  PaymentAdded,
  TaskAdded,
  TaskBriefSet,
  TaskDueDateSet,
  TaskDomainSet,
  TaskSkillSet,
  TaskRoleUserSet,
  TaskPayoutSet,
  TaskDeliverableSubmitted,
  TaskCompleted,
  TaskWorkRatingRevealed,
  TaskFinalized,
  PayoutClaimed,
  TaskCanceled,
  DomainAdded,
  FundingPotAdded,
  RegisterColonyLabelCall,
} from '../../generated/templates/Colony/IColony'
import { IColonyNetwork } from '../../generated/ColonyNetwork/IColonyNetwork'

import { Colony, ColonyRoles, Domain, Task, TaskPayout, ClaimedPayout, ClaimedRewardPayout, InitialisedColony, ColonyFundsTransferBetweenFundingPots, ClaimedColonyFunds, BriefSetTask, CompletedTask } from '../../generated/schema'

export function handleColonyInitialised(event: ColonyInitialised): void {
  let initialisedColony = new InitialisedColony(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  initialisedColony.colonyAddress = event.address
  initialisedColony.colonyNetwork = event.params.colonyNetwork
  initialisedColony.token = event.params.token
  initialisedColony.timestamp = event.block.timestamp
  initialisedColony.save()
}

export function handleColonyBootstrapped(event: ColonyBootstrapped): void {}

export function handleColonyUpgraded(event: ColonyUpgraded): void {}

export function handleColonyRoleSet(event: ColonyRoleSet): void {
  let roles = ColonyRoles.load(event.address.toHex() + '_' + event.params.domainId.toString() + '_' + event.params.user.toHex())
  if (!roles) {
    roles = new ColonyRoles(event.address.toHex() + '_' + event.params.domainId.toString() + '_' + event.params.user.toHex())
    roles.user = event.params.user
    roles.domain = event.address.toHex() + '_' + event.params.domainId.toString()
  }

  switch (event.params.role) {
    // TODO: support the other roles

    case 6:
      roles.administration = event.params.setTo
      break;

    default:
      break;
  }
  roles.timestamp = event.block.timestamp
  roles.save()
}

export function handleColonyFundsMovedBetweenFundingPots(
  event: ColonyFundsMovedBetweenFundingPots
): void {
  let colonyFundTransfer = new ColonyFundsTransferBetweenFundingPots(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  colonyFundTransfer.colonyAddress = event.address
  colonyFundTransfer.fromPot = event.params.fromPot
  colonyFundTransfer.toPot = event.params.toPot
  colonyFundTransfer.amount = event.params.amount
  colonyFundTransfer.token = event.params.token
  colonyFundTransfer.timestamp = event.block.timestamp
  colonyFundTransfer.save()
}

export function handleColonyFundsClaimed(event: ColonyFundsClaimed): void {
  let claimedColonyFunds = new ClaimedColonyFunds(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  claimedColonyFunds.colonyAddress = event.address
  claimedColonyFunds.token = event.params.token
  claimedColonyFunds.fee = event.params.fee
  claimedColonyFunds.payoutRemainder = event.params.payoutRemainder
  claimedColonyFunds.timestamp = event.block.timestamp
  claimedColonyFunds.save()
}

export function handleRewardPayoutCycleStarted(
  event: RewardPayoutCycleStarted
): void {}

export function handleRewardPayoutCycleEnded(
  event: RewardPayoutCycleEnded
): void {}

/// @notice Event logged when reward payout is claimed
/// @param rewardPayoutId The reward payout cycle id
/// @param user The user address who received the reward payout
/// @param fee The fee deducted from payout
/// @param rewardRemainder The remaining reward amount paid out to user
/// event RewardPayoutClaimed(uint256 rewardPayoutId, address user, uint256 fee, uint256 rewardRemainder);
export function handleRewardPayoutClaimed(event: RewardPayoutClaimed): void {
  let rewardPayoutClaimed = new ClaimedRewardPayout(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  rewardPayoutClaimed.colonyAddress = event.address
  rewardPayoutClaimed.rewardPayoutId = event.params.rewardPayoutId
  rewardPayoutClaimed.user = event.params.user
  rewardPayoutClaimed.fee = event.params.fee
  rewardPayoutClaimed.rewardRemainder = event.params.rewardRemainder
  rewardPayoutClaimed.timestamp = event.block.timestamp
  rewardPayoutClaimed.save()
}

export function handleColonyRewardInverseSet(
  event: ColonyRewardInverseSet
): void {}

export function handlePaymentAdded(event: PaymentAdded): void {}

export function handleTaskAdded(event: TaskAdded): void {
  let task = new Task(event.params.taskId.toString())
  task.taskId = event.params.taskId
  task.colonyAddress = event.address
  task.status = 'created'
  task.timestamp = event.block.timestamp
  task.save()  
}

export function handleTaskBriefSet(event: TaskBriefSet): void {
  let briefSetTask = new BriefSetTask(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  briefSetTask.colonyAddress = event.address
  briefSetTask.taskId = event.params.taskId
  briefSetTask.specificationHash = event.params.specificationHash
  briefSetTask.timestamp = event.block.timestamp
  briefSetTask.save()  
}

export function handleTaskDueDateSet(event: TaskDueDateSet): void {}

export function handleTaskDomainSet(event: TaskDomainSet): void {}

export function handleTaskSkillSet(event: TaskSkillSet): void {}

export function handleTaskRoleUserSet(event: TaskRoleUserSet): void {}

export function handleTaskPayoutSet(event: TaskPayoutSet): void {
  let taskPayout = new TaskPayout(event.params.taskId.toString() + '_' + event.address.toHex())
  taskPayout.taskId = event.params.taskId
  taskPayout.colonyAddress = event.address
  taskPayout.role = event.params.role
  taskPayout.token = event.params.token
  taskPayout.amount = event.params.amount
  taskPayout.timestamp = event.block.timestamp
  taskPayout.save()
}

export function handleTaskDeliverableSubmitted(
  event: TaskDeliverableSubmitted
): void {}

export function handleTaskCompleted(event: TaskCompleted): void {
  let completedTask = new CompletedTask(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  completedTask.colonyAddress = event.address
  completedTask.taskId = event.params.taskId
  completedTask.timestamp = event.block.timestamp
  completedTask.save()  
}

export function handleTaskWorkRatingRevealed(
  event: TaskWorkRatingRevealed
): void {}

export function handleTaskFinalized(event: TaskFinalized): void {
  let task = new Task(event.params.taskId.toString())
  task.taskId = event.params.taskId
  task.colonyAddress = event.address
  task.status = 'finalized'
  task.timestamp = event.block.timestamp
  task.save()
}

/// @notice Event logged when a payout is claimed, either from a Task or Payment
/// @param fundingPotId Id of the funding pot where payout comes from
/// @param token Token of the payout claim
/// @param amount Amount of the payout claimed, after network fee was deducted
// event PayoutClaimed(uint256 indexed fundingPotId, address indexed token, uint256 amount);
export function handlePayoutClaimed(event: PayoutClaimed): void {
  let payoutClaimed = new ClaimedPayout(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  payoutClaimed.colonyAddress = event.address
  payoutClaimed.fundingPotId = event.params.fundingPotId
  payoutClaimed.token = event.params.token
  payoutClaimed.amount = event.params.amount
  payoutClaimed.timestamp = event.block.timestamp
  payoutClaimed.save()
}

export function handleTaskCanceled(event: TaskCanceled): void {}

export function handleDomainAdded(event: DomainAdded): void {
  let domain = new Domain(event.address.toHex() + '_' + event.params.domainId.toString())
  domain.index = event.params.domainId
  domain.parent = event.address
  domain.colonyAddress = event.address
  domain.timestamp = event.block.timestamp
  domain.save()
}

export function handleFundingPotAdded(event: FundingPotAdded): void {}

// TODO: reinstate this when it can handle upgradable contracts
// export function handleRegisterColonyLabel(call: RegisterColonyLabelCall): void {
//   let colony = Colony.load(call.to.toHex())
  
//   if (colony) {
//     colony.ensName = call.inputs.colonyName
//     colony.orbitAddress = call.inputs.orbitdb
//     colony.save()
//   }
// }
